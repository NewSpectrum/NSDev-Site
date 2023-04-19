# Installing Windows



## Using `DiskPart` from your Boot Disk

When installing any Windows Operating System, going at *least* as far back as __Windows 7__, the __Installation Media__ contains several tools and features that are (by default) hidden from plain sight. One of these tools is an __Administrator Command Prompt__, which comes with the [`DISKPART`](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/diskpart) utility.


### Streamline the Volume Step

#### WARNING
Only use this step if you plan on performing a __Clean Installation__, as it will __erase *all* data from the selected disk__.

One of the first steps in the Windows installation is __selecting a volume__ to install Windows on. Sometimes, however, there are multiple volumes that already exist. For __clean installations__, pre-existing volumes are something you don't want to include. The GUI utility for selecting/creating/deleting/formatting volumes (aka *partitions*) is slow and annoying. So before you even start, follow the steps below to make sure your disk is ready for installation.


<br />

#### Step 1: Open the Command Prompt

Press <kbd>SHIFT</kbd>+<kbd>F10</kbd> to open the Administrative Command Prompt.

<!--

<img id="cmd_boot"
     src=""
	 width="auto" height="auto"
	 />

/-->


<br />

#### Step 2: Open `DiskPart` & Select the 'Boot Disk'

##### Input:
```bat
diskpart

list disk
:: Find the correct disk, usually by its 'Size'

sel disk %YOUR_BOOT_DISK_NUMBER%
```

__IMPORTANT__: Replace `%YOUR_BOOT_DISK_NUMBER%` with the number that applies to *your system*. If the computer is brand new (or a laptop), `0` is *usually* the correct target.

##### Output Example:
```
X:\> diskpart

Microsoft DiskPart version 10.0.19041.964

Copyright (C) Microsoft Corporation.
On computer: <boot_disk>

DISKPART> list disk

  Disk ###  Status         Size     Free     Dyn  Gpt
  --------  -------------  -------  -------  ---  ---
  Disk 0    Online         2794 GB  1024 KB        *
  Disk 1    Online            9 TB      0 B        *
  Disk 2    Online          465 GB  1024 KB        *
  Disk 4    Online          232 GB      0 B

DISKPART> sel disk 4
```
__NOTE__: For the sake of this tutorial I will be performing the operations on a __256GB Flash Drive__, which is __Disk 4 (232GB)__ in the example above.

The above output is from my own system, so my __Boot Disk__ is actually __Disk 2__. However, most of the time (especially when working with a laptop or new/pre-built desktop), the drive you intend to use as a Boot Disk is *almost* always going to be __Disk 0__.


<br />

#### Optional: Confirm your Selection

If you want to double-check which disk is currently selected in the DISKPART utility, use `list disk` again and find the one that has an Asterisk `*` placed before the `Disk [NUM]`.

##### Input
```bat
sel disk 4

list disk
```

##### Output Example
```
DISKPART> sel disk 4

Disk 4 is now the selected disk.

DISKPART> list disk

  Disk ###  Status         Size     Free     Dyn  Gpt
  --------  -------------  -------  -------  ---  ---
  Disk 0    Online         2794 GB  1024 KB        *
  Disk 1    Online            9 TB      0 B        *
  Disk 2    Online          465 GB  1024 KB        *
* Disk 4    Online          232 GB      0 B
```


<br />

#### Step 3: `clean` & `convert` the Boot Disk

The [`CLEAN`](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/clean) tool performs a similar function to [`FORMAT`](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2012-r2-and-2012/cc753770(v=ws.11)) except it targets the entire disk instead of a single partition.

The default partitioning scheme used when cleaning a disk with `CLEAN` is [MBR](https://en.wikipedia.org/wiki/Master_boot_record), which stands for *[Master Boot Record](https://en.wikipedia.org/wiki/Master_boot_record)*. This is not compatible with [UEFI](https://en.wikipedia.org/wiki/Unified_Extensible_Firmware_Interface). To be compatible with __UEFI, the drive must be converted to use [GPT](https://en.wikipedia.org/wiki/GUID_Partition_Table), which stands for *[GUID Partition Table](https://en.wikipedia.org/wiki/GUID_Partition_Table)*.

##### Input
```bat
clean

convert gpt

list disk
```

##### Output Example
```
DISKPART> sel disk 4

Disk 4 is now the selected disk.

DISKPART> clean

DiskPart succeeded in cleaning the disk.

DISKPART> convert gpt

DiskPart successfully converted the selected disk to GPT format.

DISKPART> list disk

  Disk ###  Status         Size     Free     Dyn  Gpt
  --------  -------------  -------  -------  ---  ---
  Disk 0    Online         2794 GB  1024 KB        *
  Disk 1    Online            9 TB      0 B        *
  Disk 2    Online          465 GB  1024 KB        *
* Disk 4    Online          232 GB   232 GB        *
```

Verify the disk has been converted to use __GPT__ with `list disk`. If the disk is using the __GPT Format__ it will have an Asterisk `*` under the `Gpt` column.


<br /><br /><br />

---

```bat
:: Open the integrated Command Prompt with F10
:: (you might need to press SHIFT + F10 if just F10 doesn't work)

diskpart

:: List all disks on the system
list disk
	:: The disk you want to use as your Boot Disk is
	:: almost always Disk 0

sel disk 0
	:: Select the disk you want to use as your Boot Disk
	:: 'SEL' is an alias for 'SELECT' (case insensitive)

:: Clean the selected disk of all partitions
clean
	:: 'CLEAN' performs a similar function to 'FORMAT'
	:: except it targets the entire disk instead of a
	:: single partition.

:: Set the disk to use GPT partitioning (for UEFI)
convert gpt
	:: The default partitioning scheme used when cleaning
	:: a disk is MBR. This is not compatible with UEFI.

list disk
	:: Verify that the disk is now using GPT partitioning
```