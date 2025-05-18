# Rapid Response
Rapid Response is a web application designed to make appointments easier for practitioners to understand the needs of their clients and to allow those clients to know about a practitioner before scheduling with them; a client can now directly schedule with a practitioner that meets their standards, needs, and comfort. 

## User Experience Flows
There are two expected users that may interact with this web application, clients and practitioners. Depending on this, the user experience changes to accommodate them. The user is directed to their relevant views on this basis. 

### User Experience as a Client

### **Welcome**
Once the user is logged in, they are met with a simple welcome page. From here, a navigation bar makes much of the web application's functionality accessible to them.

![image](https://github.com/user-attachments/assets/57f1862b-0587-493a-aa79-ede9cc34dbbe)

### **Creating An Appointment**
A new view of the web application, the core upon which the project was planned. This component allows the client to create their appointment. Here, there are fields that rely on information that the client-user entered in their one-time, user data entry form. These fields include their name, date of birth, and gender. Aside from these fields, the client has a drop-down box from which they may select their preferred practitioner, a text area where they can describe the reason for their appointment, and a date-entry field for setting the appointment's date and time.

![image](https://github.com/user-attachments/assets/428aa471-9d4e-4d35-a88e-4199008b8ab1)

### **My Appointments**

Once a client-user has created an appointment, and it has been submitted, they are redirected to a list of appointments (*they may also navigate to this list through the navigation bar*). Here, they may view pending appointments and completed appointments. Each appointment has an associated link which allows the client-user to view each appointment's details. 

![image](https://github.com/user-attachments/assets/508e6b91-c30a-41bc-825c-77198a86e6a1)

### **Meet the Staff**

This is component is a feature that introduces the staff on the roster of the clinic. Here the client-user may view that roster. Each practitioner has an associated link with their name, when clicked the user is directed to that practitioner's details. The details include the practitioner's name, age, gender, practice, and experience in years. The client-user may also schedule with a practitioner from this details view.

![image](https://github.com/user-attachments/assets/02fd0631-b934-47d5-91be-a962098a392d)

Once the user clicks on one of the practitioners' names, they are redirected to that practitioner's profile page.

![image](https://github.com/user-attachments/assets/b15fe53c-20c8-49b5-afd8-baaf0c92a7a2)

From here, a client may also schedule an appointment with the practitioner who they are viewing. 

### User Experience as a Practitioner

### **Welcome**

Once the user is logged in, they are met with a simple welcome page. From here, a navigation bar makes much of the web application's functionality accessible to them.

![image](https://github.com/user-attachments/assets/ec0d2c8d-cc05-4b09-9348-82d730a5daf6)

Notice the difference in the navigation bars between a practitioner and a client user.

### **My Appointments**

Once a practitioner-user has been scheduled in an appointment, their appointments list updates with the new appointments. Here, they may view pending appointments and completed appointments. Each appointment has an associated link which allows the practitioner-user to view each appointment's details. The practitioner has the functionality to change an appointment's status from pending to complete.

![image](https://github.com/user-attachments/assets/9a9ca0c6-14bc-47b2-a293-03f8731f6dcd)

In this list view of appointments, a practitioner may confirm that an appointment has been completed. The status of the appointment will be updated for the practitioner's client.

### **Meet the Staff**

This is component is a feature that introduces the staff on the roster of the clinic. Here the practitioner-user may view that roster. Each practitioner has an associated link with their name, when clicked the user is directed to that practitioner's details. The details include the practitioner's name, age, gender, practice, and experience in years. The practitioner may not schedule an appointment with a colleague, nor can they edit the details of a colleague's profile, but they may edit their own profile.


### **Run it locally**

Rapid Response is a basic React app. To pull the project down locally to your computer clone the repository:
```bash
git clone git@github.com:EthanB934/rapid-response.git
```

After cloning the repository, a new directory will be creating, `rapid-reponse`:

```bash
cd rapid-response/
```

When you have changed directories, install the React app's dependencies with this command:

```bash
npm install
```

After the installation completes, you are ready to host the website. Run the command:

```bash
npm run dev
```

The website will now be locally hosted on your computer and an address will given to you to view the website. 

Finally, to interact with the website so that data is saved as you interact with the website, clone the API:

```bash
git clone 
```
