# Case Tracking Dashboard

Public Case Tracker.

## Contents

Cases are stored in the `cases` directory. Each case is a YAML file like this:

```yaml
name: Wifi Connection Issue
description: Some students are having trouble connecting to the wifi in the library.
tags:
    - Networking
    - Wifi
    - Library
status: open
officer: Jacob
events:
    - title: Case Created
      content: |
          Some students reported that they are having trouble connecting to the wifi in the library.

          They are using Windows laptops and the wifi is not showing up in the list of available networks.
      date: "2024-01-01"
    - title: Investigating
      content: |
          We have asked the engineering team to investigate the issue.

          They believe that the wifi access points in the library are not working properly with Windows.
      date: "2024-01-03"
    - title: Updated Progress
      content: |
          New access points have been installed in the library.

          The engineering team is now monitoring the situation to see if the issue has been resolved.
      date: "2024-01-04"
    - title: Updated Progress
      content: |
          The engineering team has confirmed that the issue has been resolved.

          The students who reported the issue have also confirmed that they are now able to connect to the wifi.
      date: "2024-01-05"
    - title: Case Closed
      content: |
          The case has been successfully resolved and is now closed.
      date: "2024-01-05"
```
