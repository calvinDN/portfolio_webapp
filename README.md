portfolio_webapp
================

This web application is being made mostly to improve my web development skills so if you have any criticisms I'd appreciate any communication.

You can see a [deployed example here](http://floating-atoll-7245.herokuapp.com/), it currently may or may not be up to date. It is a work in progress, you can see my [Trello board here](https://trello.com/b/TR7a0Rw9/portfolio-webapp) to see what I am planning/currently working on/ditching.

Deploy Locally:
---------------
<ol>
<li>$ git clone https://github.com/calvinDN/portfolio_webapp.git</li>
<li>$ cd portfolio_webapp</li>
<li>Edit JS config files in the *settings* folder</li>
<li>$ npm install</li>
<li>$ node server.js</li>
<li>Go to localhost:8000 in your browser.</li>
</ol>

Deploy on Heroku:
-----------------
<ol start="0">
<li>Install Heroku and Git.</li>
<li>$ git clone https://github.com/calvinDN/portfolio_webapp.git</li>
<li>$ cd portfolio_webapp</li>
<li>Edit JS config files in the *settings* folder</li>
<li>$ heroku create</li>
<li>$ git push heroku master</li>
<li>$ heroku addons:add mongolab:sandbox</li>
<li>$ heroku ps:scale web=1</li>
<li>(Optional, useful for free accounts) If your app idles for ~hour it may shutdown so you can counter this by setting up a Heroku scheduler ($ heroku addons:add scheduler:standard) or you could use a service like <a href="https://www.pingdom.com/">Pingdom</a> (they have a free tier). </li>
</ol>

Compatibility
-------------
IE8+

Bugs
-------------
I have not spent much time testing, if you find any bugs feel free to contact me although depending on my current workload I may write them off as features.

Author
-------------
Calvin Nichols