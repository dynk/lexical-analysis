# lexical-analysis
calculate the proportion of non lexical words in a text


# Prerequisites
Docker version >= 17.06
docker-compose version >= 1.21.1
run the file build.sh

# Guide through the application
To create a regular user use the route:

    - POST localhost:3020/v1/users
    - Payload: 
    {
	    "email": "email@email.com",
	    "name": "user name",
	    "password": "yoursecretpassword",
    }

then you will receive a token to insert in your header in the (x-auth), use it to access your data.

To create a user admin provide the adminCode field with 'secretadmincode123' code.

To get users data:

    - GET localhost:3020/v1/users
    - Response: 
    [{
	    "email": "email@email.com",
	    "name": "user name"
    }]
To login:

    - POST localhost:3020/v1/users/login
    - Payload: 
    {
	    "email": string,
	    "password": string,
    }

then you will receive a token to insert in your header in the (x-auth), use it to access your data.

To create new lexical word you need to use a admin user and then:

    - POST localhost:3020/v1/lexical
    - Payload: 
    {
	    "value": "lexicalWorld"
    }

To calculate the lexiical complexity:

    - POST localhost:3020/v1/complexity
    - Payload: 
    {
	    "text": "Text to be analyzed."
    }
    - Response: 
    {
      "data": {
        "overall_ld": "0.27"
      }
    }


To calculate the lexiical complexity verbose:

    - POST localhost:3020/v1/complexity?mode=verbose
    - Payload: 
    {
	    "text": "Text to be analyzed."
    }
    - Response: 
    {
      "data": {
        "sentence_ld": [
            "0.00",
            "0.33"
        ],
        "overall_ld": "0.27"
      }
    }

