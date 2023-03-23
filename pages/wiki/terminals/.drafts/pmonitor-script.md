---
layout           : wiki
  # See [Wiki Layout] for help

tawkto           : true
---



# Name


`pmonitor` | `pmonitor.sh`



## Synopsis

Monitor and output a job’s progress in real-time.


## DESCRIPTION

The pmonitor command will display the progress of a process as a percentage. It does this by examining the process’s open files, and calculating the ratio between the position of the file’s seek pointer offset and the file length. For processes that process files in a sequential fashion, such as file compression and database import, this ratio can be translated to the percentage of the job that has been completed.

The command may produce no output, if a process does not hold any open files with a non-zero seek offset.


<br >

---

# Usage

## Syntax

<div id="manpage_usage" class="manpage">
	<pre id="cmd_syntax" class="syntax">
	<code id="syntax_code" class="language-bash_syntax">
		pmonitor [ -c | --command=COMMAND ] [ -i | --interval=INTERVAL ]
		pmonitor -f [file]
		pmonitor -p pid [-i interval]
	</code>
	</pre>
</div>



<br >

## Options

### Command Process

Monitor the process of a specified command.

#### Option Syntax
`-c COMMAND | --command=COMMAND`

#### Option Description

Monitor the progress through the files opened by the specified running command. The command can be specified through (part) of its name (e.g. gzip), or through a regular expression if the argument starts with a /. See the documentation of the lsof(1) -c option regarding the rules and flags associated with the use of regular expressions.



<br >

### File Processing

Monitor a process’s progress through its processing of the specified file.

#### Option Syntax
`-f FILE | --file=FILE`

Monitor a process’s progress through its processing of the specified file.



<br >

### Monitor a Process ID (PID)

Monitor the progress of the process with the specified process id PID.

#### Option Syntax
`-p PID | --pid=PID`

#### Option Description




<br >

### Refresh Interval

Repeat the output every INTERVAL seconds.

#### Option Syntax
`-i INTERVAL | --interval=INTERVAL`

#### Option Description




<br >

### Help

Display the program’s usage information and exit.

#### Option Syntax
`-h  | --help`



<br />

---

# Credits

## Owner

#### Diomidis Spinellis
- __Roles:__
	- Original Creator
	- Lead Author
- GitHub: [dspinellis](https://github.com/dspinellis)
- Website: http://www.spinellis.gr/



## Contributing

#### Richard Joubert
- __Role:__
	- Wiki & Documentation Editor
- GitHub: [RichNSD](https://github.com/RichNSD)
- Website: [NewSpectrum.dev](https://hub.newspectrum.dev)


---

# Reporting

Visit the utility’s GitHub page at https://github.com/dspinellis/pmonitor. Fixes and improvements are accepted through pull requests.


SEE ALSO

lsof(1),
The pmonitor command is modelled after a similar facility that was available on the Permin-Elmer/Concurrent OS32.