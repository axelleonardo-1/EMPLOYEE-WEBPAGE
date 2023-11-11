import random
import json
from datetime import datetime, timedelta

# Crear un identificador único falso para simular un ObjectId de MongoDB
def fake_object_id():
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    random_id = ''.join(random.choices('abcdef0123456789', k=10))
    return timestamp + random_id

# Datos de las empresas y otros detalles para los registros
companies_info = {
    "Oracle": {
        "description": "American multinational computer technology corporation",
        "logo": "/app/views/assets/BusinessLogos/oracle.png"
    },
    "Amazon": {
        "description": "Multinational technology company focusing on e-commerce, cloud computing, and AI",
        "logo": "/app/views/assets/BusinessLogos/amazon.png"
    },
    "GymShark": {
        "description": "Fitness apparel and accessories brand",
        "logo": "/app/views/assets/BusinessLogos/gymshark.png"
    },
    "Costco": {
        "description": "Multinational corporation that operates a chain of membership-only warehouse clubs",
        "logo": "/app/views/assets/BusinessLogos/costco.png"
    },
    "Nike": {
        "description": "American multinational corporation engaged in the design and manufacturing of footwear, apparel, and accessories",
        "logo": "/app/views/assets/BusinessLogos/nike.png"
    },
    "Toyota": {
        "description": "Japanese multinational automotive manufacturer",
        "logo": "/app/views/assets/BusinessLogos/toyota.png"
    }
}

# Lista de títulos de trabajo
job_titles = [
    "Software Engineer", "Sales Manager", "Data Scientist", "Product Designer",
    "Project Manager", "Marketing Director", "Operations Coordinator", "HR Specialist"
]

# Lista de habilidades
skills_list = [
    "Teamwork", "Communication", "Analytical Thinking", "Creativity",
    "Leadership", "Technical Writing", "Project Management", "Marketing Analytics"
]

# Lista de requisitos
requirements_list = [
    "Bachelor's Degree", "3+ years of experience", "Fluency in English",
    "Experience with CRM", "Proficiency in MS Office", "Understanding of cloud services"
]

# Generar una colección de registros JSON
job_collection = []
for i in range(30):
    company_name = random.choice(list(companies_info.keys()))
    job_collection.append({
        "_id": fake_object_id(),
        "employerId": fake_object_id(),
        "title": random.choice(job_titles),
        "description": f"Join {company_name} as a {random.choice(job_titles)}.",
        "requirements": random.sample(requirements_list, 2),
        "skills": random.sample(skills_list, 2),
        "salaryRange": {
            "min": random.randint(50000, 70000),
            "max": random.randint(70001, 120000)
        },
        "jobType": random.choice(["Full-Time", "Part-Time", "Internship", "Remote"]),
        "location": random.choice(["New York", "California", "Texas", "Remote"]),
        "company": companies_info[company_name],
        "postedAt": (datetime.now() - timedelta(days=random.randint(0, 60))).isoformat(),
        "status": random.choice(["active", "closed"])
    })

# Mostrar los primeros 2 registros para revisión
job_collection_json = json.dumps(job_collection[:30], indent=4)
print(job_collection_json)


