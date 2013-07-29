portfolio_webapp
================

This web application is being made mostly to improve my web development skills so if you have any critisms I'd appreciate any communication.

You can see a [deployed example here](http://glacial-inlet-5558.herokuapp.com/), it currently may or may not be up to date. It is a work in progress, you can see my [Trello board here](https://trello.com/b/TR7a0Rw9/portfolio-webapp) to see what I am planning/currently working on/ditching.


To deploy on Heroku:
-------------------
<ol>
<li>git clone https://github.com/calvinDN/portfolio_webapp.git</li>
<li>cd portfolio_webapp</li>
<li>Edit JS config files in the *settings* folder</li>
<li>heroku create</li>
<li>git push heroku master</li>
<li>heroku addons:add mongolab:sandbox</li>
<li>heroku ps:scale web=1</li>
</ol>