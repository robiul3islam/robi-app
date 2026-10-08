# ROBI Graphics – APK (মোবাইল) + EXE (পিসি)

## কীভাবে APK ও PC ভার্সন পাবেন (কম্পিউটারে কিছু install লাগবে না)
1. https://github.com এ ফ্রি অ্যাকাউন্ট খুলুন → **New repository** (নাম: robi-app)
2. এই ফোল্ডারের সব ফাইল (লুকানো `.github` ফোল্ডারসহ) repository-তে upload করুন
3. **Actions** ট্যাব → **Build APK and PC app** → **Run workflow**
4. ৫-১০ মিনিট পর রান শেষ হলে নিচে **Artifacts** থেকে নামান:
   - `ROBI-Graphics-Mobile-APK` → ROBI-Graphics-Mobile.apk (ফোনে install)
   - `ROBI-Graphics-PC-EXE` → ROBI-Graphics-PC.exe (Windows, install ছাড়াই চলে)

## নিজের পিসিতে চালাতে চাইলে
npm install && npm start
