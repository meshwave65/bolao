import time
import requests
import subprocess

SUPABASE_URL = "https://SEU_PROJECT.supabase.co"
SUPABASE_KEY = "SUA_SERVICE_ROLE_KEY"

HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}"
}


# -------------------------
# BUSCAR JOBS
# -------------------------
def fetch_jobs():
    r = requests.get(
        f"{SUPABASE_URL}/rest/v1/engine_jobs?status=eq.pending&order=created_at.asc&limit=5",
        headers=HEADERS,
        timeout=10
    )
    return r.json()


# -------------------------
# UPDATE STATUS
# -------------------------
def update_job(job_id, data):
    requests.patch(
        f"{SUPABASE_URL}/rest/v1/engine_jobs?id=eq.{job_id}",
        headers=HEADERS,
        json=data,
        timeout=10
    )


# -------------------------
# PIPELINE REAL
# -------------------------
def run_pipeline(code):
    print(f"⚙️ Running engines for {code}")

    subprocess.run(["python3", "engine_assets.py", code], check=True)
    subprocess.run(["python3", "engine_workspace.py", code], check=True)
    subprocess.run(["python3", "engine_canguess_2_0.py", code], check=True)


# -------------------------
# LOOP PRINCIPAL
# -------------------------
while True:

    jobs = fetch_jobs()

    for job in jobs:
        job_id = job["id"]
        code = job["code"]

        try:
            print(f"\n🚀 JOB START {code}")

            update_job(job_id, {"status": "running", "attempts": job["attempts"] + 1})

            run_pipeline(code)

            update_job(job_id, {"status": "done"})

            print(f"✅ JOB DONE {code}")

        except Exception as e:
            print("❌ ERROR:", e)

            update_job(job_id, {
                "status": "error",
                "last_error": str(e)
            })

    time.sleep(5)
