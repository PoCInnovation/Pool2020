# Client-side security

We usually see computer security as actions to protect our infrastructures and applications
from attacks by others. But in a lot of cases, security is as much about protecting yourself
as about protecting your user's privacy.

Today we'll talk about client-side security, i.e. the security of a web page.


Disclaimer: Yesterday's rules about subitting root-me flags to the [CTF platform](https://challs.pwnh4.com/)
still stands.

# 0 - Primer about client-side authentication

Let's start with some pretty simple exercices about client-side authentication. Each of the few
following applications try to validate the identity of the user via Javascript, which, as you'll see,
is a pretty bad idea.

- [Exercice 1](https://www.root-me.org/en/Challenges/Web-Client/Javascript-Source)

The three following exercices are pretty much identical to this first challenge, but the
author of the application tries to hide the behavior of the code.

- [Exercice 2](https://www.root-me.org/en/Challenges/Web-Client/Javascript-Obfuscation-1)
- [Exercice 3](https://www.root-me.org/en/Challenges/Web-Client/Javascript-Obfuscation-2)
- [Exercice 4](https://www.root-me.org/en/Challenges/Web-Client/Javascript-Obfuscation-3)

# 1 - Protect your users

Now that you are familiar with Javascript, we can dig right in the heart of today's subject,
client-side attacks. The two main attack vectors found in client-side applications are
[XSS](https://owasp.org/www-community/attacks/xss/) and [CSRF](https://owasp.org/www-community/attacks/csrf/)

Let's start with a few challenges about XSS:

- [Exercice 1](http://prompt.ml/0)
- [Exercice 2](http://prompt.ml/1)
- [Exercice 3](http://prompt.ml/2)

Disclaimer: For every one of these challenges, since there are no flags to get, the flag will
be handed to you by your helpers when you provide a screenshot of the exercice solved, along with
a short explanation of what was needed to solve the challenge.

The last XSS exercice we will do is a practical case where you will effectively have to steal
someone elses data.

- [Final Exercice](https://www.root-me.org/en/Challenges/Web-Client/XSS-Stored-1)

# 2 - And now for something pretty similar

To end the first part of the day, let's talk about CSRF, cross-site request forgery.

This time you want to abuse the victim's browser to act on the websitew itself, not steal credentials.

- [Exercice](https://www.root-me.org/en/Challenges/Web-Client/CSRF-0-protection)