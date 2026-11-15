from django.core.management.base import BaseCommand
from apps.accounts.models import User
from apps.profiles.models import WorkerProfile, EmployerProfile
from apps.jobs.models import Job

class Command(BaseCommand):
    help = 'Seeds initial sample data for Vetrion (19 jobs, 16 workers, 1 admin)'

    def handle(self, *args, **options):
        self.stdout.write("Seeding Vetrion database...")

        # 1. Create Owner Superuser
        owner, created = User.objects.get_or_create(
            phone="9999999999",
            defaults={
                'role': 'owner',
                'is_staff': True,
                'is_superuser': True,
                'status': 'active'
            }
        )
        if created:
            owner.set_password("vetrion_admin_2026")
            owner.save()
            self.stdout.write(self.style.SUCCESS("Created owner superuser: 9999999999 / vetrion_admin_2026"))

        # 2. Seed 19 Jobs with Employers
        jobs_data = [
            ("Domestic Cook & Housekeeper (சமையல் கலைஞர்)", "household", "Food & Cooking", "Adyar", "Chennai", 12000, "month", "98401 23450", "Lakshmi Narayanan (Household)", "Need an experienced cook for a vegetarian family of 4. Morning 7 AM to 2 PM. Basic kitchen cleaning included. Sunday holiday."),
            ("Electrical Wireman & Helper (எலக்ட்ரீசியன்)", "contractor", "Construction", "Gandhipuram", "Coimbatore", 850, "day", "94432 11980", "Murugesan Electricals", "Commercial building wiring project in Gandhipuram. Daily wage paid every Saturday evening. Safety equipment and afternoon tea provided."),
            ("Textile Showroom Sales Assistant (விற்பனையாளர்)", "shop", "Shop & Retail", "Vilakkuthoon", "Madurai", 11500, "month", "98421 88760", "Vasantham Silks", "Prominent silk saree showroom requires energetic retail sales staff. Good customer interaction skill required. Lunch provided."),
            ("Tractor Driver & Farm Hand (டிராக்டர் டிரைவர்)", "farm", "Farm & Agri", "Lalgudi", "Tiruchirappalli", 750, "day", "97860 44210", "Kaveri Organic Farm", "Paddy cultivation season. Tractor ploughing and field levelling. Must have valid tractor driving license. Daily batta of ₹100 provided."),
            ("Delivery Executive (2-Wheeler Parcel Delivery)", "company", "Driving & Delivery", "Fairlands", "Salem", 16000, "month", "99440 76540", "Swift Logistics Salem", "E-commerce package deliveries in Salem city limits. Must have own bike and valid driving license. Petrol allowance ₹3.50/km extra."),
            ("CNC Lathe Machine Operator (சிஎன்சி ஆபரேட்டர்)", "company", "Factory & Machine", "Peelamedu", "Coimbatore", 18000, "month", "94870 98210", "Apex Precision Tools", "Auto component manufacturing unit. 2 years experience with Fanuc/Siemens controller required. Rotational shift with ESI & PF."),
            ("Senior Mason & Plasterer (கொத்தனார்)", "contractor", "Construction", "Palayamkottai", "Tirunelveli", 950, "day", "94420 31450", "Shri Ram Constructions", "Independent villa construction. Brickwork, lintel concrete and fine plastering. Immediate start. Continuous 2 months work."),
            ("Elderly Patient Day Caretaker (முதியோர் பராமரிப்பு)", "household", "Home Care", "Anna Nagar", "Chennai", 18500, "month", "98410 77120", "Dr. K. Ravichandran", "Compassionate male or female caretaker for 78-year-old gentleman. Assistance with walking, medication and diet. 9 AM - 6 PM."),
            ("Boutique Tailor - Blouse & Chudidhar (தையல்கலைஞர்)", "shop", "Tailoring & Garments", "Simmakkal", "Madurai", 700, "day", "98433 66120", "Geetha Designer Works", "Ladies tailoring shop requires skilled tailor for designer blouses and anarkali suits. Sewing machine provided at shop. Per-piece bonus."),
            ("Coconut Tree Climber & Harvester (தென்னை மரம் ஏறுபவர்)", "farm", "Farm & Agri", "Ambasamudram", "Tirunelveli", 1200, "day", "97871 55900", "Vallinayagam Farms", "Coconut grove with 85 palms. Nut harvesting and dry leaf cleaning. Tree climbing machine or manual climbers welcome. Work finishes by 2 PM."),
            ("Supermarket Cashier & Billing Staff (பில்லிங்)", "shop", "Shop & Retail", "Thillai Nagar", "Tiruchirappalli", 13000, "month", "94435 88900", "Sri Krishna Super Bazaar", "Busy departmental store requires computer billing assistant. Basic English reading and barcode billing training provided."),
            ("Family Car Driver (குடும்ப கார் டிரைவர்)", "household", "Driving & Delivery", "RS Puram", "Coimbatore", 15000, "month", "98422 34100", "Sundaram Family", "Experienced driver with clean record for automatic SUV. School drops and local errands. Non-smoker preferred. Uniform provided."),
            ("Security Guard - Day Shift (பாதுகாவலர்)", "company", "Security & Guard", "Kandhampatti", "Salem", 11000, "month", "99430 45670", "Surya Security Services", "Textile warehouse entry gate monitoring and visitor log. 12 hours shift (7 AM - 7 PM). Ex-servicemen or experienced guards preferred."),
            ("Landscape Gardener & Pruner (தோட்ட பராமரிப்பு)", "household", "Gardening & Farm", "ECR Neelankarai", "Chennai", 650, "day", "98402 12980", "Anand Villa", "Beachfront villa garden. Lawn mowing, rose garden fertilizing, and hedge trimming. Work required 2 days a week (Tuesday & Friday)."),
            ("Restaurant Master Parotta Maker (பரோட்டா மாஸ்டர்)", "shop", "Food & Cooking", "Mattuthavani", "Madurai", 1100, "day", "98421 99010", "Hotel Pandian Mess", "Traditional Madurai bun parotta & kothu parotta master needed. Evening 4 PM to 11:30 PM. Room stay and 2 times food provided."),
            ("Office Assistant & Peon (அலுவலக உதவியாளர்)", "company", "Office & Admin", "Cantonment", "Tiruchirappalli", 10000, "month", "94431 87650", "Ramesh & Associates CA", "Auditor office helper for file maintenance, client hospitality (tea/coffee), bank visits and local document deliveries. 9:30 AM to 6:30 PM."),
            ("House Painter & Whitewash (பெயிண்டர்)", "contractor", "Construction", "Suramangalam", "Salem", 800, "day", "98427 12390", "Rajan Painting Works", "2 BHK apartment interior emulsion repainting and door enamel painting. 4 days work. Brushes, rollers and paint provided by contractor."),
            ("Two-Wheeler Mechanic Helper (மெக்கானிக் உதவியாளர்)", "shop", "Factory & Machine", "Vannarpettai", "Tirunelveli", 600, "day", "94433 22110", "Nellai Auto Works", "Bike service garage helper. Oil changing, water wash, chain lubrication and basic disassembly. Great opportunity to learn full mechanic work."),
            ("Warehouse Packing & Loading Helper (பேக்கிங்)", "company", "Other", "Ambattur OT", "Chennai", 13500, "month", "98409 88320", "TN Pack & Move Logistics", "FMCG goods carton packing, sealing and truck loading. General shift. Attendance bonus of ₹1,000 for full monthly attendance.")
        ]

        for title, kind, wtype, area, city, pay, punit, phone, emp_name, desc in jobs_data:
            employer_user, _ = User.objects.get_or_create(phone=phone, defaults={'role': 'admin'})
            EmployerProfile.objects.get_or_create(
                user=employer_user,
                defaults={
                    'name_or_business': emp_name,
                    'kind': kind,
                    'city': city,
                    'area': area
                }
            )
            Job.objects.get_or_create(
                employer=employer_user,
                title=title,
                defaults={
                    'work_type': wtype,
                    'city': city,
                    'area': area,
                    'pay': pay,
                    'pay_unit': punit,
                    'description': desc,
                    'status': 'open'
                }
            )

        # 3. Seed 16 Workers
        workers_data = [
            ("Muthukumar S.", "98421 76540", "Madurai", "Goripalayam", "Licensed Electrician & Plumbing Specialist", ["Construction", "Wiring", "Pipe Fitting"], 800, "day", 7, "available", "7 years of hands-on experience in house wiring, motor connections, and emergency repair service across Madurai."),
            ("Selvi R.", "98403 44120", "Chennai", "Mylapore", "Traditional South Indian Cook & Housekeeper", ["Food & Cooking", "Home Care", "Veg Cooking"], 13000, "month", 9, "available", "Expert in authentic Brahmin style vegetarian cooking, tiffin varieties, and maintaining kitchen hygiene."),
            ("Arumugam K.", "94431 55210", "Tiruchirappalli", "Srirangam", "Senior Mason & Granite/Tile Layer", ["Construction", "Masonry", "Tile Laying"], 950, "day", 12, "available", "Specialized in bathroom floor tiles, granite staircase fixing, brickwork, and waterproofing."),
            ("Vigneshwaran P.", "98422 99870", "Coimbatore", "Singanallur", "Commercial Driver (Car, Van & Pickup)", ["Driving & Delivery", "Heavy Vehicle"], 16000, "month", 5, "within_week", "Valid badge license with 5 years accident-free driving record across Coimbatore and Nilgiris."),
            ("Thilagavathi M.", "99440 22310", "Salem", "Shevapet", "Master Tailor - Designer Blouse & Aari Embroidery", ["Tailoring & Garments", "Embroidery"], 750, "day", 8, "available", "Expert in bridal blouse cutting, Aari work finishing, and custom salwar suits."),
            ("Ramachandran B.", "94420 88710", "Tirunelveli", "Tenkasi Road", "Tractor Operator & Agri Farm Supervisor", ["Farm & Agri", "Tractor Driving"], 750, "day", 10, "available", "Comprehensive experience in paddy, banana and coconut farming, and drip irrigation setup."),
            ("Karthik G.", "98428 11420", "Madurai", "KK Nagar", "Retail Billing Clerk & Inventory Assistant", ["Shop & Retail", "Office & Admin"], 12500, "month", 3, "available", "Fast typing skills in Tally and POS software. Experienced in supermarket cashier work."),
            ("Revathi S.", "98412 88930", "Chennai", "Tambaram", "Certified Patient Caregiver & Home Nurse", ["Home Care", "Elderly Care"], 17000, "month", 6, "available", "Trained in geriatric patient assistance, sugar checking, wheelchair handling, and compassionate bedside care."),
            ("Manickam V.", "94438 44210", "Tiruchirappalli", "Ponmalai", "Fast Food & Parotta Master", ["Food & Cooking", "Fast Food"], 1100, "day", 11, "available", "Experienced hotel master specializing in soft coin parotta, veechu parotta, fried rice, and gravies."),
            ("Prakash D.", "98420 55140", "Coimbatore", "Saravanampatti", "Field Executive & Bike Delivery Partner", ["Driving & Delivery", "Logistics"], 15000, "month", 2, "available", "Active delivery partner with own BS6 bike and smartphone. Familiar with IT corridor routes."),
            ("Murugan P.", "99441 66720", "Salem", "Hasthampatti", "Professional Wall Painter & Wood Polisher", ["Construction", "Painting"], 850, "day", 7, "available", "Skilled in wall putty smoothing, exterior weather-coat paint, spray painting, and wood varnish."),
            ("Shenbagam N.", "94421 99080", "Tirunelveli", "Town", "Office Receptionist & Tele-caller", ["Office & Admin", "Shop & Retail"], 11500, "month", 4, "within_week", "Fluent in Tamil and working English. Experienced in handling front desk inquiries and Excel reporting."),
            ("Sundaramoorthy E.", "98425 33410", "Coimbatore", "Ganapathy", "CNC Lathe & Milling Machine Setter", ["Factory & Machine", "CNC Programming"], 19000, "month", 6, "available", "Diploma in Mechanical. Expert in drawing reading, tool offset setting, and quality control."),
            ("Kannan T.", "98405 66780", "Chennai", "Velachery", "Gardener & Tree Pruning Expert", ["Gardening & Farm", "Lawn Care"], 700, "day", 5, "available", "Skilled in terrace garden maintenance, organic pesticide preparation, and lawn grass laying."),
            ("Kalaiselvi P.", "98426 77140", "Madurai", "Sellur", "Shop & Office Helper / Sweeper", ["Shop & Retail", "Office & Admin"], 8500, "month", 4, "available", "Trustworthy assistant for shop opening, sweeping, mopping, utensil washing, and tea distribution."),
            ("Velmurugan R.", "94430 11950", "Tiruchirappalli", "Ariyamangalam", "Night Security Guard & Watchman", ["Security & Guard", "Night Shift"], 12000, "month", 5, "available", "Alert night security guard with good physical fitness. Experience guarding godowns and apartments.")
        ]

        for name, phone, city, area, headline, skills, pay, punit, exp, avail, about in workers_data:
            worker_user, _ = User.objects.get_or_create(phone=phone, defaults={'role': 'worker'})
            WorkerProfile.objects.get_or_create(
                user=worker_user,
                defaults={
                    'name': name,
                    'city': city,
                    'area': area,
                    'headline': headline,
                    'work_types': skills,
                    'expected_pay': pay,
                    'pay_unit': punit,
                    'experience_years': exp,
                    'availability': avail,
                    'about': about
                }
            )

        self.stdout.write(self.style.SUCCESS(f"Successfully seeded {len(jobs_data)} jobs and {len(workers_data)} workers!"))
