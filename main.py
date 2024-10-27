
users = {
    "patients": {},
    "practitioners": {}
}


medical_records = {}


def sign_up():
    print("Sign up as:")
    print("1. Medical Practitioner")
    print("2. Patient")
    choice = input("Choose an option (1 or 2): ")
    
    username = input("Enter your username: ")
    password = input("Enter your password: ")

    if choice == "1":
        speciality = input("Enter your area of specialty: ")
        users["practitioners"][username] = {"password": password, "speciality": speciality}
        print(f"Medical Practitioner {username} registered successfully.")
    
    elif choice == "2":
        users["patients"][username] = {"password": password}
        medical_records[username] = []
        print(f"Patient {username} registered successfully.")

    else:
        print("Invalid choice!")


def log_in():
    print("Log in as:")
    print("1. Medical Practitioner")
    print("2. Patient")
    choice = input("Choose an option (1 or 2): ")

    username = input("Enter your username: ")
    password = input("Enter your password: ")

    if choice == "1":
        if username in users["practitioners"] and users["practitioners"][username]["password"] == password:
            print(f"Welcome Medical Practitioner {username}.")
            practitioner_menu(username)
        else:
            print("Incorrect username or password.")

    elif choice == "2":
        if username in users["patients"] and users["patients"][username]["password"] == password:
            print(f"Welcome Patient {username}.")
            view_report(username)
        else:
            print("Incorrect username or password.")

    else:
        print("Invalid choice!")


def practitioner_menu(practitioner_username):
    patient_name = input("Enter the patient's full name: ")
    patient_id = input("Enter the patient number/ID: ")
    condition = input("Enter the patient's medical condition: ")
    description = input("Enter a description of the condition: ")
    prescription = input("Enter the prescription: ")
    solution = input("Enter the suggested solution: ")
    
    
    report = {
        "Practitioner": practitioner_username,
        "Condition": condition,
        "Description": description,
        "Prescription": prescription,
        "Solution": solution
    }
    
   
    if patient_name in medical_records:
        medical_records[patient_name].append(report)
    else:
        medical_records[patient_name] = [report]
    
   
    action = input("What do you want the other medical practitioner to do with the report? ")
    print(f"You requested that the other practitioner: {action}")
    
    
    confirm = input("Do you want to send this report to another registered medical practitioner? (yes/no): ")
    
    if confirm.lower() == "yes":
        recipient = input("Enter the medical practitioner username to send the report: ")
        if recipient in users["practitioners"]:
            print(f"Report successfully sent to {recipient}.")
        else:
            print("The practitioner does not exist.")
    else:
        print("Report not sent.")


def view_report(patient_username):
    if patient_username in medical_records:
        print(f"Medical reports for {patient_username}:")
        for idx, report in enumerate(medical_records[patient_username], 1):
            print(f"\nReport {idx}:")
            print(f"Medical Practitioner: {report['Practitioner']}")
            print(f"Condition: {report['Condition']}")
            print(f"Description: {report['Description']}")
            print(f"Prescription: {report['Prescription']}")
            print(f"Solution: {report['Solution']}")
    else:
        print("No medical reports available.")


def main():
    while True:
        print("\nMedical System")
        print("1. Sign Up")
        print("2. Log In")
        print("3. Exit")
        
        choice = input("Choose an option: ")
        
        if choice == "1":
            sign_up()
        elif choice == "2":
            log_in()
        elif choice == "3":
            print("Exiting system.")
            break
        else:
            print("Invalid option. Please try again.")


if __name__ == "__main__":
    main()