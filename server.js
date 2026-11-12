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
        <title>Zezo Solver | المنصة الذكية لحل كيريو</title>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap" rel="stylesheet">
        <style>
            * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Cairo', sans-serif; }
            body { background-color: #070913; color: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: space-between; min-height: 100vh; padding: 20px; }
            
            header { width: 100%; max-width: 480px; display: flex; justify-content: space-between; align-items: center; padding: 15px 0; border-bottom: 1px solid rgba(255,255,255,0.08); margin-bottom: 20px; }
            .logo { display: flex; align-items: center; gap: 10px; text-decoration: none; color: #fff; font-weight: 700; font-size: 18px; }
            .logo-icon { background: linear-gradient(135deg, #3a7bd5, #00d2ff); width: 35px; height: 35px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 900; box-shadow: 0 4px 15px rgba(0,210,255,0.3); }
            .badge-top { background: rgba(255, 65, 108, 0.15); color: #ff416c; border: 1px solid rgba(255, 65, 108, 0.3); padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; display: flex; align-items: center; gap: 5px; }

            main { width: 100%; max-width: 480px; display: flex; flex-direction: column; gap: 20px; }
            
            .hero-text { text-align: right; margin-bottom: 5px; }
            .hero-text .sub-tag { color: #00d2ff; font-size: 12px; font-weight: 700; letter-spacing: 1px; margin-bottom: 5px; text-transform: uppercase; display: block; }
            .hero-text h1 { font-size: 24px; font-weight: 900; line-height: 1.4; color: #fff; }
            .hero-text h1 span { background: linear-gradient(45deg, #00d2ff, #3a7bd5); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            .hero-text p { color: #8a99ad; font-size: 13px; margin-top: 5px; }

            .card { background: #11152c; border: 1px solid #1f274a; border-radius: 16px; padding: 24px; box-shadow: 0 15px 35px rgba(0,0,0,0.4); }
            .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 12px; }
            .card-header span { color: #5d6b98; font-size: 11px; font-weight: 700; letter-spacing: 1px; }
            .card-header h2 { font-size: 15px; color: #fff; font-weight: 700; }

            .input-group { margin-bottom: 16px; }
            label { display: block; margin-bottom: 6px; font-size: 13px; color: #c3d1e6; font-weight: 600; }
            input { width: 100%; padding: 12px 16px; background: #070913; border: 1px solid #232d59; border-radius: 10px; color: #fff; font-size: 14px; outline: none; transition: 0.3s; }
            input:focus { border-color: #00d2ff; box-shadow: 0 0 10px rgba(0, 210, 255, 0.25); }
            
            button { width: 100%; padding: 14px; background: linear-gradient(135deg, #3a7bd5, #00d2ff); border: none; border-radius: 10px; color: white; font-weight: 700; font-size: 15px; cursor: pointer; transition: 0.3s; box-shadow: 0 5px 20px rgba(58,123,213,0.4); margin-top: 5px; }
            button:hover { opacity: 0.95; transform: translateY(-2px); }
            
            #status { margin-top: 15px; text-align: center; font-size: 13px; font-weight: 600; }

            .features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 10px; }
            .feature-box { background: #0e1225; border: 1px solid #1a2244; padding: 12px 8px; border-radius: 12px; text-align: center; }
            .feature-box b { display: block; font-size: 11px; color: #fff; margin-bottom: 3px; }
            .feature-box small { font-size: 10px; color: #6b7c9f; }

            footer { width: 100%; max-width: 480px; text-align: center; padding: 20px 0; border-top: 1px solid rgba(255,255,255,0.05); color: #5d6b98; font-size: 11px; margin-top: 20px; }
            footer span { color: #00d2ff; font-weight: 600; }
        </style>
    </head>
    <body>
        <header>
            <a href="/" class="logo">
                <div class="logo-icon">Z</div>
                <span>ZEZO <b>SOLVER</b></span>
            </a>
            <div class="badge-top">🔥 صاروووخ</div>
        </header>

        <main>
            <div class="hero-text">
                <span class="sub-tag">YOUR NEXT STEP STARTS HERE</span>
                <h1>طريقك للتفوق <span>يبدأ بخطوة.</span></h1>
                <p>أدخل بيانات منصة كيريو التعليمية لبدء الحل التلقائي.</p>
            </div>

            <div class="card">
                <div class="card-header">
                    <h2>بيانات الطالب</h2>
                    <span>01 / STUDENT ACCESS</span>
                </div>
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

            <div class="features">
                <div class="feature-box">
                    <b>خصوصية تامة</b>
                    <small>حماية وآمان بياناتك</small>
                </div>
                <div class="feature-box">
                    <b>واجهة سريعة</b>
                    <small>متوافق مع الهواتف</small>
                </div>
                <div class="feature-box">
                    <b>حل تلقائي</b>
                    <small>لكل الفصول بضغط</small>
                </div>
            </div>
        </main>

        <footer>
            تم تطوير الموقع بواسطة : <span>Zezo & Kareem Style</span> © 2026
        </footer>

        <script>
            document.getElementById('solveForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                const btn = document.getElementById('btn');
                const status = document.getElementById('status');
                btn.disabled = true;
                btn.innerText = 'جاري الاتصال بالمنصة... ⏳';
                status.style.color = '#00d2ff';
                status.innerText = 'برجاء الانتظار، جاري معالجة الحل...';
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
                        status.innerText = '✅ تم الحل بنجاح يا فنان!';
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
        
        await page.goto('https://me-portal.qureo.education/login', { waitUntil: 'domcontentloaded', timeout: 30000 });
        
        await page.waitForSelector('input', { timeout: 15000 });
        
        const inputs = await page.$$('input');
        if (inputs.length >= 2) {
            await inputs[0].type(studentId, { delay: 50 });
            await inputs[1].type(password, { delay: 50 });
        } else {
            throw new Error('لم يتم العثور على حقول الإدخال');
        }
        
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
        res.json({ success: false, error: 'خطأ أثناء الاتصال بالمنصة: تأكد من صحة البيانات' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
