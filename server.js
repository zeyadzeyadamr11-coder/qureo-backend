const express = require('express');
const puppeteer = require('puppeteer');
const app = express();
app.use(express.json());

app.post('/connect', async (req, res) => {
    const { studentId, password } = req.body;
    let browser = null;
    
    try {
        browser = await puppeteer.launch({ 
            headless: "new", 
            args: [
                '--no-sandbox', 
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage'
            ] 
        });
        
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(30000);

        await page.goto('https://www.qureo.jp/login', { waitUntil: 'networkidle2' });
        
        await page.waitForSelector('#student-id', { timeout: 5000 });
        await page.type('#student-id', studentId);
        await page.type('#password', password);
        
        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle0' }),
            page.click('#login-button')
        ]);
        
        const lessons = await page.evaluate(() => {
            const items = document.querySelectorAll('.lesson-card');
            return Array.from(items).map(item => ({
                title: item.innerText.trim(),
                status: item.classList.contains('completed') ? 'done' : 'pending'
            }));
        });
        
        return res.json({ success: true, data: lessons });

    } catch (error) {
        console.error('Puppeteer Automation Error:', error.message);
        return res.status(500).json({ 
            success: false, 
            message: 'فشل تسجيل الدخول أو جلب البيانات. يرجى التحقق من صحة بيانات الحساب.',
            error: error.message 
        });

    } finally {
        if (browser) {
            await browser.close();
        }
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Real Backend Running on Port ${PORT}`));
