const express = require('express');
const puppeteer = require('puppeteer');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>موقع Zezo لحل منصة كيريو 😎</title>
        <style>
            * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
            body { background-color: #0b0d19; color: #ffffff; display: flex; flex-direction: column; align-items: center; padding: 20px; min-height: 100vh; }
            .header { text-align: center; margin-top: 20px; margin-bottom: 30px; }
            .badge { background: linear-gradient(90deg, #ff416c, #ff4b2b); padding: 6px 16px; border-radius: 20px; font-size: 14px; font-weight: bold; display: inline-block; margin-bottom: 15px; }
            h1 { font-size: 26px; margin-bottom: 10px; background: linear-gradient(45deg, #00d2ff, #3a7bd5); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            p.sub { color: #8a99ad; font-size: 14px; }
            .card { background: #13172d; border: 1px solid #232a4d; border-radius: 16px; padding: 24px; width: 100%; max-width: 420px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
            .card-title { color: #5d6b98; font-size: 12px; letter-spacing: 1px; margin-bottom: 15px; font-weight: bold; }
            .input-group { margin-bottom: 18px; }
            label { display: block; margin-bottom: 8px; font-size: 14px; color: #c3d1e6; }
            input { width: 100%; padding: 12px 16px; background: #0b0d19; border: 1px solid #2a335c; border-radius: 10px; color: #fff; font-size: 15px; outline: none; transition: 0.3s; }
            input:focus { border-color: #3a7bd5; box-shadow: 0 0 8px rgba(58, 123, 213, 0.4); }
            button { width: 100%; padding: 14px; background: linear-gradient(90deg, #3a7bd5, #00d2ff); border: none; border-radius: 10px; color: white; font-weight: bold; font-size: 16px; cursor: pointer; transition: 0.3s; margin-top: 10px; }
            button:hover { opacity: 0.9; transform: translateY(-2px); }
            #status { margin-top: 15px; text-align: center; font-size: 14px; color: #00ffcc; font-weight: bold; }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="badge">🔥 صاروووخ</div>
            <h1>موقع Zezo لحل منصة كيريو 😎</h1>
            <p class="sub">طريقك للتفوق يبدأ بخطوة .. الحل التلقائي لجميع الفصول</p>
        </div>
        <div class="card">
            <div class="card-title">STUDENT ACCESS / 01</div>
            <h3 style="margin-bottom: 20px;">بيانات الطالب</h3>
            <form id="solveForm">
                <div class="input-group">
                    <label>اسم المستخدم (Login ID)</label>
                    <input type="text" id="studentId" placeholder="أدخل الـ ID الخاص بك" required>
                </div>
                <div class="input-group">
                    <label>كلمة السر (Password)</label>
                    <input type="password" id="password" placeholder="أدخل كلمة السر" required>
                </div>
                <button type="submit" id="btn">ابدأ الحل الآن 🚀</button>
            </form>
            <div id="status"></div>
        </div>
        <script>
            document.getElementById('solveForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                const btn = document.getElementById('btn');
                const status = document.getElementById('status');
                btn.disabled = true;
                btn.innerText = 'جاري التحقق والحل... ⏳';
                status.style.color = '#00ffcc';
                status.innerText = 'شغال بيحل المنصة دلوقتي، استنى ثواني...';
                try {
                    const res = await fetch('/connect', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            studentId: document.getElementById('studentId').value,
                            password: document.getElementById('password').value
                        })
                    });
                    const data = await res.json();
                    if(data.success) {
                        status.style.color = '#00ffcc';
                        status.innerText = '✅ تم الحل بنجاح يا زيزو!';
                    } else {
                        status.style.color = '#ff416c';
                        status.innerText = '❌ ' + data.error;
                    }
                } catch(err) {
                    status.style.color = '#ff416c';
                    status.innerText = '❌ تعذر الاتصال بالسيرفر!';
                } finally {
                    btn.disabled = false;
                    btn.innerText = 'ابدأ الحل الآن 🚀';
                }
            });
        </script>
    </body>
    </html>
    `);
});

app.post('/connect', async (req, res) => {
    const { studentId, password } = req.body;
    let browser = null;
    try {
        browser = await puppeteer.launch({
            headless: 'new',
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--disable-blink-features=AutomationControlled'
            ]
        }); 
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
        
        // التوجيه المباشر على رابط تسجيل الدخول الذي جلبته
        await page.goto('https://me-portal.qureo.education/login', { waitUntil: 'domcontentloaded', timeout: 30000 });
        
        // الانتظار المباشر لحقول الإدخال (لأننا في صفحة الدخول فوراً)
        await page.waitForSelector('input', { timeout: 15000 });
        
        const inputs = await page.$$('input');
        if (inputs.length >= 2) {
            await inputs[0].type(studentId, { delay: 50 });
            await inputs[1].type(password, { delay: 50 });
        } else {
            throw new Error('لم يتم العثور على حقول الإدخال');
        }
        
        // الضغط على زر تسجيل الدخول
        const submitBtn = await page.$('button[type="submit"], input[type="submit"]');
        if (submitBtn) {
            await submitBtn.click();
        } else {
            await page.keyboard.press('Enter');
        }
        
        await new Promise(r => setTimeout(r, 6000));

        await browser.close();
        res.json({ success: true, data: [] });
    } catch (error) {
        if (browser) await browser.close();
        res.json({ success: false, error: 'خطأ: ' + error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
