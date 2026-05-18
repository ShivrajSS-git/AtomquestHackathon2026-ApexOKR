const express = require('express');
const cors = require('cors');
const { setupDb } = require('./database');

const app = express();
app.use(cors());
app.use(express.json());

let db;

setupDb().then(database => {
    db = database;
    const PORT = 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

// Auth Mock (In a real app, use JWT/Passport)
app.post('/api/login', async (req, res) => {
    const { email } = req.body;
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (user) {
        res.json(user);
    } else {
        res.status(401).json({ error: 'Invalid email' });
    }
});

// Get User Goals
app.get('/api/goals/:userId', async (req, res) => {
    const goals = await db.all('SELECT * FROM goals WHERE user_id = ?', [req.params.userId]);
    res.json(goals);
});

// Create/Update Goals
app.post('/api/goals', async (req, res) => {
    const { user_id, thrust_area, title, description, uom, target, weightage, year } = req.body;
    
    // Validation: Total weightage check could be done here too
    
    const result = await db.run(
        `INSERT INTO goals (user_id, thrust_area, title, description, uom, target, weightage, year) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [user_id, thrust_area, title, description, uom, target, weightage, year]
    );
    res.json({ id: result.lastID });
});

// Submit for Approval
app.post('/api/goals/submit', async (req, res) => {
    const { user_id } = req.body;
    await db.run('UPDATE goals SET approved = 1 WHERE user_id = ? AND approved = 0', [user_id]);
    res.json({ success: true });
});

// Manager: Get Team
app.get('/api/manager/team/:managerId', async (req, res) => {
    const team = await db.all('SELECT * FROM users WHERE manager_id = ?', [req.params.managerId]);
    res.json(team);
});

// Manager: Get Team Goals
app.get('/api/manager/goals/:managerId', async (req, res) => {
    const goals = await db.all(`
        SELECT g.*, u.name as employee_name 
        FROM goals g 
        JOIN users u ON g.user_id = u.id 
        WHERE u.manager_id = ? AND g.approved > 0
    `, [req.params.managerId]);
    res.json(goals);
});

// Manager: Approve/Reject
app.post('/api/manager/approve', async (req, res) => {
    const { goal_id, approved, comments } = req.body; // approved: 2 (Approved), 3 (Rework)
    await db.run('UPDATE goals SET approved = ? WHERE id = ?', [approved, goal_id]);
    // Log audit
    res.json({ success: true });
});

// Manager: Edit Goal Target/Weightage inline
app.post('/api/manager/edit_goal', async (req, res) => {
    const { goal_id, target, weightage } = req.body;
    await db.run('UPDATE goals SET target = ?, weightage = ? WHERE id = ?', [target, weightage, goal_id]);
    res.json({ success: true });
});

// Get Achievements for a user's goals
app.get('/api/achievements/:userId', async (req, res) => {
    const achievements = await db.all(`
        SELECT a.*, g.title, g.target, g.uom, g.weightage, g.user_id
        FROM achievements a
        JOIN goals g ON a.goal_id = g.id
        WHERE g.user_id = ?
    `, [req.params.userId]);
    res.json(achievements);
});

// Submit/Update Achievement
app.post('/api/achievements', async (req, res) => {
    const { goal_id, quarter, actual, status } = req.body;
    const existing = await db.get('SELECT id FROM achievements WHERE goal_id = ? AND quarter = ?', [goal_id, quarter]);
    
    if (existing) {
        await db.run(
            'UPDATE achievements SET actual = ?, status = ?, timestamp = CURRENT_TIMESTAMP WHERE id = ?',
            [actual, status, existing.id]
        );
    } else {
        await db.run(
            `INSERT INTO achievements (goal_id, quarter, actual, status) VALUES (?, ?, ?, ?)`,
            [goal_id, quarter, actual, status]
        );
    }
    res.json({ success: true });
});

// Manager: Add comment to check-in
app.post('/api/manager/checkin_comment', async (req, res) => {
    const { achievement_id, manager_comment } = req.body;
    await db.run('UPDATE achievements SET manager_comment = ? WHERE id = ?', [manager_comment, achievement_id]);
    res.json({ success: true });
});
