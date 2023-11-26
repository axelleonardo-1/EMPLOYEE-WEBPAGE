# import random
# import json
# from datetime import datetime, timedelta

# # Función para crear un identificador único falso
# def fake_object_id():
#     timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
#     random_id = ''.join(random.choices('abcdef0123456789', k=10))
#     return timestamp + random_id

# # Información de las empresas
# companies_info = {
#     "Oracle": {
#         "name": "Oracle",
#         "description": "American multinational computer technology corporation",
#         "logo": "./assets/BusinessLogos/oracle.png"
#     },
#     "Amazon": {
#         "name": "Amazon",
#         "description": "Multinational technology company focusing on e-commerce, cloud computing, and AI",
#         "logo": "./assets/BusinessLogos/amazon.png"
#     },
#     "GymShark": {
#         "name": "GymShark",
#         "description": "Fitness apparel and accessories brand",
#         "logo": "./assets/BusinessLogos/gymshark.png"
#     },
#     "Costco": {
#         "name": "Costco",
#         "description": "Multinational corporation that operates a chain of membership-only warehouse clubs",
#         "logo": "./assets/BusinessLogos/costco.png"
#     },
#     "Nike": {
#         "name": "Nike",
#         "description": "American multinational corporation engaged in the design and manufacturing of footwear, apparel, and accessories",
#         "logo": "./assets/BusinessLogos/nike.png"
#     },
#     "Toyota": {
#         "name": "Toyota",
#         "description": "Japanese multinational automotive manufacturer",
#         "logo": "./assets/BusinessLogos/toyota.png"
#     }
# }

# # Títulos de trabajo
# job_titles = [
#     "Software Engineer", "Sales Manager", "Data Scientist", "Product Designer",
#     "Project Manager", "Marketing Director", "Operations Coordinator", "HR Specialist"
# ]

# # Habilidades
# skills_list = [
#     "Teamwork", "Communication", "Analytical Thinking", "Creativity",
#     "Leadership", "Technical Writing", "Project Management", "Marketing Analytics"
# ]

# # Requisitos
# requirements_list = [
#     "Bachelor's Degree", "3+ years of experience", "Fluency in English",
#     "Experience with CRM", "Proficiency in MS Office", "Understanding of cloud services"
# ]

# # employersId for publishers availables
# publishersUsers = [
#     "655d788398514eaf95faa3dd", "655d78c298514eaf95faa3df","655d791a98514eaf95faa3e2","655d797298514eaf95faa3e4"
# ]

# # Crear colección de trabajos
# job_collection = []
# for i in range(30):
#     sample_list = random.sample(publishersUsers,1)
#     sample_string = sample_list[0]

#     req = random.sample(requirements_list,2)
#     reqString = req[0]+" and "+req[1]

#     sk = random.sample(skills_list, 2)
#     skString = sk[0]+" and "+sk[1]

#     company_name = random.choice(list(companies_info.keys()))
#     company = companies_info[company_name]
#     job_collection.append({
#         "peopleInterested": None,
#         "employerId": sample_string,
#         "title": random.choice(job_titles),
#         "description": f"Join {company_name} as a {random.choice(job_titles)}.",
#         "requirements": reqString,
#         "skills": skString,
#         "salaryRange": {
#             "min": random.randint(50000, 70000),
#             "max": random.randint(70001, 120000)
#         },
#         "jobType": random.choice(["Full-Time", "Part-Time", "Internship", "Remote"]),
#         "location": random.choice(["New York", "California", "Texas", "Remote"]),
#         "company": {
#             "name": company["name"],  # Adding the company name to the company info
#             "description": company["description"],
#             "logo": company["logo"]
#         },
#         "postedAt": (datetime.now() - timedelta(days=random.randint(0, 60))).isoformat(),
#         "status": random.choice(["active", "closed"])
#     })

# # Convertir la colección de trabajos a formato JSON
# job_collection_json = json.dumps(job_collection, indent=4)
# print(job_collection_json)















import random
import json
from datetime import datetime, timedelta

# Función para crear un identificador único falso
def fake_object_id():
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    random_id = ''.join(random.choices('abcdef0123456789', k=10))
    return timestamp + random_id

# Información de las empresas
companies_info = {
    "Oracle": {
        "name": "Oracle",
        "description": "American multinational computer technology corporation",
        "logo": "./assets/BusinessLogos/oracle.png"
    },
    "Amazon": {
        "name": "Amazon",
        "description": "Multinational technology company focusing on e-commerce, cloud computing, and AI",
        "logo": "./assets/BusinessLogos/amazon.png"
    },
    "GymShark": {
        "name": "GymShark",
        "description": "Fitness apparel and accessories brand",
        "logo": "./assets/BusinessLogos/gymshark.png"
    },
    "Costco": {
        "name": "Costco",
        "description": "Multinational corporation that operates a chain of membership-only warehouse clubs",
        "logo": "./assets/BusinessLogos/costco.png"
    },
    "Nike": {
        "name": "Nike",
        "description": "American multinational corporation engaged in the design and manufacturing of footwear, apparel, and accessories",
        "logo": "./assets/BusinessLogos/nike.png"
    },
    "Toyota": {
        "name": "Toyota",
        "description": "Japanese multinational automotive manufacturer",
        "logo": "./assets/BusinessLogos/toyota.png"
    }
}

# Títulos de trabajo
job_titles = [
    "Software Engineer", "Sales Manager", "Data Scientist", "Product Designer",
    "Project Manager", "Marketing Director", "Operations Coordinator", "HR Specialist"
]

# Habilidades
skills_list = [
    "Teamwork", "Communication", "Analytical Thinking", "Creativity",
    "Leadership", "Technical Writing", "Project Management", "Marketing Analytics"
]

# Requisitos
requirements_list = [
    "Bachelor's Degree", "3+ years of experience", "Fluency in English",
    "Experience with CRM", "Proficiency in MS Office", "Understanding of cloud services"
]

# employersId for publishers availables
publishersUsers = [
    "655d788398514eaf95faa3dd", "655d78c298514eaf95faa3df","655d791a98514eaf95faa3e2","655d797298514eaf95faa3e4"
]

# Crear colección de trabajos
job_collection = []
for i in range(30):
    sample_list = random.sample(publishersUsers, 1)
    sample_string = sample_list[0]

    req = random.sample(requirements_list, 2)
    reqString = ' and '.join(req)

    sk = random.sample(skills_list, 2)
    skString = ' and '.join(sk)

    company_name = random.choice(list(companies_info.keys()))
    company = companies_info[company_name]

    job_collection.append({
        "employerId": sample_string,
        "title": random.choice(job_titles),
        "description": f"Join {company_name} as a {random.choice(job_titles)}.",
        "requirements": reqString,
        "skills": skString,
        "salaryRange": {
            "min": random.randint(50000, 70000),
            "max": random.randint(70001, 120000)
        },
        "jobType": random.choice(["Full-Time", "Part-Time", "Internship", "Remote"]),
        "location": random.choice(["New York", "California", "Texas", "Remote"]),
        "company": {
            "name": company_name,
            "description": company["description"],
            "logo": company["logo"]
        },
        "postedAt": (datetime.now() - timedelta(days=random.randint(0, 60))).isoformat(),
        "status": random.choice(["active", "closed"])
    })

# Convertir la colección de trabajos a formato JSON
job_collection_json = json.dumps(job_collection, indent=4)
print(job_collection_json)

