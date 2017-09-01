# Matthew Cook's website

Running on http://mcook.me

## How to run locally
#### (Assuming you have git, python, and pip)

First, clone the repo:  
   
```
[mcook@mcook04 ~]$ git clone https://github.com/mcookhome/personal-site.git
```  
  
Next, we need to enter the directory and install the requirements:

```
[mcook@mcook04 ~]$ cd personal-site/   
[mcook@mcook04 personal-site]$ sudo pip install -r requirements.txt  
```  

We need to create a credentials file in the util folder with this structure:  
```
[mcook@mcook04 personal-site]$ vi util/credentials.py
login = {
    "email": "<your_email>",
    "password": "<your_password>"
}
```  

Finally, we can run the app:  
```
[mcook@mcook04 personal-site]$ python app.py  
 * Running on http://0.0.0.0:5000/ (Press CTRL+C to quit)  
 * Restarting with stat  
 * Debugger is active!  
 * Debugger PIN: 133-415-911  
```
  
If you want to be able to send emails, you have to turn on 'less secure apps' for your email address.
