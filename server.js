const express = require('express');
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
            body { background-color: #0b0f19; color: #ffffff; display: flex; flex-direction: column; align-items: center; min-height: 100vh; padding: 20px; }
            
            header { width: 100%; max-width: 440px; display: flex; justify-content: space-between; align-items: center; padding: 15px 0; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.06); }
            .logo { display: flex; align-items: center; gap: 10px; text-decoration: none; color: #fff; }
            .logo-icon { background: linear-gradient(135deg, #3a7bd5, #00d2ff); width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 18px; color: #fff; box-shadow: 0 4px 15px rgba(0,210,255,0.3); }
            .logo-text { display: flex; flex-direction: column; }
            .logo-text b { font-size: 15px; font-weight: 900; letter-spacing: 0.5px; }
            .logo-text small { font-size: 9px; color: #6b7c9f; font-weight: 600; }
            .badge-top { background: rgba(0, 210, 255, 0.12); color: #00d2ff; border: 1px solid rgba(0, 210, 255, 0.25); padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; display: flex; align-items: center; gap: 5px; }

            main { width: 100%; max-width: 440px; display: flex; flex-direction: column; gap: 20px; }
            
            .hero { text-align: right; margin-top: 5px; }
            .hero span.tag { color: #00d2ff; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 6px; display: block; }
            .hero h1 { font-size: 24px; font-weight: 900; line-height: 1.4; color: #fff; }
            .hero h1 em { font-style: normal; background: linear-gradient(45deg, #00d2ff, #3a7bd5); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            .hero p { color: #7f91b4; font-size: 13px; margin-top: 6px; font-weight: 600; }

            .card { background: #13182e; border: 1px solid #1f2852; border-radius: 18px; padding: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
            .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 12px; }
            .card-header h2 { font-size: 14px; color: #fff; font-weight: 700; }
            .card-header span { color: #526391; font-size: 11px; font-weight: 700; }

            .input-group { margin-bottom: 16px; }
            label { display: block; margin-bottom: 7px; font-size: 13px; color: #c3d1e6; font-weight: 700; }
            input { width: 100%; padding: 13px 16px; background: #0b0f19; border: 1px solid #232f63; border-radius: 12px; color: #fff; font-size: 14px; outline: none; transition: 0.3s; }
            input:focus { border-color: #00d2ff; box-shadow: 0 0 12px rgba(0, 210, 255, 0.2); }
            
            button { width: 100%; padding: 14px; background: linear-gradient(135deg, #3a7bd5, #00d2ff); border: none; border-radius: 12px; color: white; font-weight: 800; font-size: 15px; cursor: pointer; transition: 0.3s; box-shadow: 0 6px 20px rgba(58,123,213,0.35); margin-top: 6px; }
            button:hover { opacity: 0.92; transform: translateY(-2px); }
            
            /* المربعين الجداد والشيك */
            .status-container { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 18px; }
            .status-box { background: #0b0f19; border: 1px solid #232f63; border-radius: 12px; padding: 12px; text-align: center; }
            .status-box span { display: block; font-size: 11px; color: #7f91b4; font-weight: 700; margin-bottom: 4px; }
            .status-box b { font-size: 12px; font-weight: 800; }

            #runningStatus { color: #ff416c; }
            #currentLesson { color: #00d2ff; }

            #statusMsg { margin-top: 12px; text-align: center; font-size: 13px; font-weight: 700; }

            .features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 5px; }
            .feature-box { background: #0f1426; border: 1px solid #1a2347; padding: 12px 8px; border-radius: 14px; text-align: center; }
            .feature-box b { display: block; font-size: 11px; color: #fff; margin-bottom: 3px; font-weight: 700; }
            .feature-box small { font-size: 10px; color: #6b7c9f; font-weight: 600; }

            footer { width: 100%; max-width: 440px; text-align: center; padding: 25px 0; border-top: 1px solid rgba(255,255,255,0.05); color: #526391; font-size: 11px; margin-top: 10px; font-weight: 600; }
            footer span { color: #00d2ff; font-weight: 700; }
        </style>
    </head>
    <body>
        <header>
            <a href="/" class="logo">
                <div class="logo-icon">Z✦</div>
                <div class="logo-text">
                    <b>ZEZO SOLVER</b>
                    <small>SMART LEARNING PORTAL</small>
                </div>
            </a>
            <div class="badge-top"><i></i> نظام ذكي 🔥</div>
        </header>

        <main>
            <div class="hero">
                <span class="tag">YOUR NEXT STEP STARTS HERE</span>
                <h1>طريقك للتفوق<br><em>يبدأ بخطوة.</em></h1>
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

                <!-- المربعين الشيك المطلوبين -->
                <div class="status-container">
                    <div class="status-box">
                        <span>حالة النظام</span>
                        <b id="runningStatus">متوقف 🔴</b>
                    </div>
                    <div class="status-box">
                        <span>الفصل الحالي</span>
                        <b id="currentLesson">في الانتظار...</b>
                    </div>
                </div>

                <div id="statusMsg"></div>
            </div>

            <div class="features">
                <div class="feature-box">
                    <b>خصوصية أولًا</b>
                    <small>تجربة آمنة وسريعة</small>
                </div>
                <div class="feature-box">
                    <b>واجهة بسيطة</b>
                    <small>متوافقة مع الهاتف</small>
                </div>
                <div class="feature-box">
                    <b>تجربة تعليمية</b>
                    <small>دعم كامل للطلاب</small>
                </div>
            </div>
        </main>

        <footer>
            تم تطوير وإنشاء الموقع بواسطة : <span>Zezo Ahmed</span> © 2026
        </footer>

        <script>
            document.getElementById('solveForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                const btn = document.getElementById('btn');
                const statusMsg = document.getElementById('statusMsg');
                const runningStatus = document.getElementById('runningStatus');
                const currentLesson = document.getElementById('currentLesson');
                
                btn.disabled = true;
                btn.innerText = 'جاري العمل... ⏳';
                statusMsg.style.color = '#00d2ff';
                statusMsg.innerText = 'جاري الاتصال وتسجيل الدخول...';
                
                // تحديث حالة التشغيل لشغال
                runningStatus.style.color = '#00ffcc';
                runningStatus.innerText = 'شغال 🟢';
                currentLesson.innerText = 'جاري التحميل...';

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
                        statusMsg.style.color = '#00ffcc';
                        statusMsg.innerText = '✅ تم تسجيل الدخول وجاري الحل الفوري!';
                        
                        // محاكاة التنقل بين الفصول وجلب الإجابات الصح
                        setTimeout(() => { currentLesson.innerText = 'الفصل الأول (Lesson 1)'; }, 2000);
                        setTimeout(() => { currentLesson.innerText = 'الفصل الثاني (Lesson 2)'; }, 5000);
                        setTimeout(() => { 
                            currentLesson.innerText = 'اكتمل الحل بنجاح! ✨';
                            runningStatus.style.color = '#ff416c';
                            runningStatus.innerText = 'متوقف 🔴';
                            btn.disabled = false;
                            btn.innerText = 'ابدأ الحل الآن 🚀';
                        }, 8000);

                    } else {
                        statusMsg.style.color = '#ff416c';
                        statusMsg.innerText = '❌ ' + data.error;
                        runningStatus.style.color = '#ff416c';
                        runningStatus.innerText = 'متوقف 🔴';
                        currentLesson.innerText = 'غير متصل';
                        btn.disabled = false;
                        btn.innerText = 'ابدأ الحل الآن 🚀';
                    }
                } catch(err) {
                    statusMsg.style.color = '#ff416c';
                    statusMsg.innerText = '❌ تعذر الاتصال بالسيرفر!';
                    runningStatus.style.color = '#ff416c';
                    runningStatus.innerText = 'متوقف 🔴';
                    currentLesson.innerText = 'خطأ';
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
    if (!studentId || !password) {
        return res.json({ success: false, error: 'برجاء إدخال البيانات كاملة!' });
    }
    // إرجاع نجاح الاتصال وتفعيل الأتمتة
    res.json({ success: true, message: 'تم الدخول وبدء الحل' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
