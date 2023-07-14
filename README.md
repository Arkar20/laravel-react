
# Laravel And React Project

This Project contains Roles and Permission Management with spatie, excel (csv) export and a taste of connecting with FB Api.



## To Run the Project

To Run this project run


To run the project.

```bash
    php artisan serve
```

```bash
    npm run build
```


## Features

- Role and Permission Management
    - Super Admin can create unlimited roles and assign     Permissions
    
- Export To CSV
    - The website export csv file of the filtered results.


- Email Notifications
    - When Superadmin create new user, the email will triggered
    - Used Redis and queue worker for background running 

- A taste of FB API
    - User Can Provide Meta access token of app that has been created and the website will list its ads accounds by consuming Meta Marketing API

- Profit and Loss
    - Website will caculate profit and loss base on the order types withing last 30dasy.


## Future Plans

- Refactor the code
- Polish things up 
