// JSON database to store game card information
const cardDatabase = `{
  "cards": [
    {
      "name": "User Studies A",
      "scoreValues": {
        "internal": 0,
        "external": 7,
        "process": 0,
        "team": 2
      }
    },
    {
        "name": "User Studies B",
        "scoreValues": {
            "internal": 2,
            "external": 6,
            "process": 0,
            "team": 1
        }
    },
    {
      "name": "Train a Scrum Master A",
      "scoreValues": {
        "internal": 0,
        "external": 0,
        "process": -1,
        "team": 1
      },
      "intertemporalElement": {
        "weeks": 4,
        "internal": 0,
        "external": 0,
        "process": 1,
        "team": 1
      }
    },
    {
        "name": "Train a Scrum Master B",
        "scoreValues": {
            "internal": 0,
            "external": 0,
            "process": 0,
            "team": 1
        },
        "intertemporalElement": {
            "weeks": 4,
            "internal": 0,
            "external": 0,
            "process": 1,
            "team": 1
        }
    },
    {
      "name": "Requirements Workshop A",
      "scoreValues": {
        "internal": 3,
        "external": 5,
        "process": 0,
        "team": 2
      }
    },
    {
        "name": "Requirements Workshop B",
        "scoreValues": {
            "internal": 2,
            "external": 5,
            "process": 1,
            "team": 1
        }
    },
    {
      "name": "Daily Scrum Meetings A",
      "scoreValues": {
        "internal": 1,
        "external": 1,
        "process": 3,
        "team": 3
      }
    },
    {
        "name": "Daily Scrum Meetings B",
        "scoreValues": {
            "internal": 2,
            "external": 1,
            "process": 4,
            "team": 2
        }
    },
    {
      "name": "Software Architecture Review A",
      "scoreValues": {
        "internal": 5,
        "external": 1,
        "process": 1,
        "team": 1
      }
    },
    {
        "name": "Software Architecture Review B",
        "scoreValues": {
            "internal": 4,
            "external": 1,
            "process": 3,
            "team": 0
        }
    },
    {
      "name": "Mentorship A",
      "scoreValues": {
        "internal": 2,
        "external": 0,
        "process": 0,
        "team": 7
      },
      "intertemporalElement": {
        "weeks": 4,
        "internal": 0,
        "external": 0,
        "process": 0,
        "team": 1
      }
    },
    {
        "name": "Mentorship B",
        "scoreValues": {
            "internal": 1,
            "external": 0,
            "process": 1,
            "team": 8
        },
        "intertemporalElement": {
            "weeks": 4,
            "internal": 0,
            "external": 0,
            "process": 0,
            "team": 1
        }
    },
    {
      "name": "Test-Driven Development A",
      "scoreValues": {
        "internal": 9,
        "external": 0,
        "process": 2,
        "team": 0
      }
    },
    {
        "name": "Test-Driven Development B",
        "scoreValues": {
            "internal": 8,
            "external": 0,
            "process": 3,
            "team": 0
        }
    },
    {
      "name": "Reference Documentation A",
      "scoreValues": {
        "internal": 2,
        "external": 0,
        "process": 7,
        "team": 0
      }
    },
    {
        "name": "Reference Documentation B",
        "scoreValues": {
            "internal": 3,
            "external": -1,
            "process": 8,
            "team": 0
        }
    },
    {
      "name": "Refactor A",
      "scoreValues": {
        "internal": 10,
        "external": -2,
        "process": -1,
        "team": 0
      }
    },
    {
        "name": "Refactor B",
        "scoreValues": {
            "internal": 10,
            "external": -3,
            "process": -2,
            "team": 2
        }
    },
    {
      "name": "Test Automation A",
      "scoreValues": {
        "internal": 8,
        "external": 1,
        "process": 1,
        "team": 0
      }
    },
    {
        "name": "Test Automation B",
        "scoreValues": {
            "internal": 7,
            "external": 1,
            "process": 2,
            "team": 0
        }
    },
    {
      "name": "Architectural Design A",
      "scoreValues": {
        "internal": 8,
        "external": 2,
        "process": 1,
        "team": 0
      }
    },
    {
        "name": "Architectural Design B",
        "scoreValues": {
            "internal": 5,
            "external": 3,
            "process": 2,
            "team": 0
        }
    },
    {
      "name": "Major Toolchain Upgrade 1A",
      "scoreValues": {
        "internal": 2,
        "external": 0,
        "process": 6,
        "team": -2
      },
      "intertemporalElement": {
        "weeks": 4,
        "internal": 0,
        "external": 0,
        "process": 1,
        "team": 0
      }
    },
    {
        "name": "Major Toolchain Upgrade 1B",
        "scoreValues": {
            "internal": 3,
            "external": -1,
            "process": 5,
            "team": -1
        },
        "intertemporalElement": {
            "weeks": 4,
            "internal": 0,
            "external": 0,
            "process": 1,
            "team": 0
        }
    },
    {
      "name": "Major Toolchain Upgrade 2A",
      "scoreValues": {
        "internal": 2,
        "external": 0,
        "process": 6,
        "team": -2
      },
      "intertemporalElement": {
        "weeks": 4,
        "internal": 0,
        "external": 0,
        "process": -1,
        "team": 0
      }
    },
    {
        "name": "Major Toolchain Upgrade 2B",
        "scoreValues": {
            "internal": 3,
            "external": -1,
            "process": 5,
            "team": -1
        },
        "intertemporalElement": {
            "weeks": 4,
            "internal": 0,
            "external": 0,
            "process": -1,
            "team": 0
        }
    },
    {
      "name": "Teamwork Session A",
      "scoreValues": {
        "internal": 1,
        "external": 0,
        "process": 3,
        "team": 6
      }
    },
    {
        "name": "Teamwork Session B",
        "scoreValues": {
            "internal": 0,
            "external": 0,
            "process": 2,
            "team": 7
        }
    },
    {
      "name": "Github Day A",
      "scoreValues": {
        "internal": 0,
        "external": 0,
        "process": 6,
        "team": 3
      }
    },
    {
        "name": "Github Day B",
        "scoreValues": {
            "internal": 1,
            "external": 0,
            "process": 6,
            "team": 2
        }
    },
    {
      "name": "External Coaching A",
      "scoreValues": {
        "internal": 0,
        "external": 0,
        "process": 3,
        "team": 1
      }
    },
    {
      "name": "External Coaching B",
      "scoreValues": {
        "internal": 1,
        "external": 0,
        "process": 2,
        "team": 3
      }
    },
    {
      "name": "Feature Development A",
      "scoreValues": {
        "internal": 0,
        "external": 8,
        "process": 0,
        "team": 0
      }
    },
    {
      "name": "Feature Development B",
      "scoreValues": {
        "internal": 1,
        "external": 8,
        "process": 0,
        "team": 0
      }
    },
    {
      "name": "Rush a New Feature A",
      "scoreValues": {
        "internal": -1,
        "external": 7,
        "process": 0,
        "team": -1
      }
    },
    {
      "name": "Rush a New Feature B",
      "scoreValues": {
        "internal": -1,
        "external": 8,
        "process": 0,
        "team": 1
      }
    },
    {
      "name": "Development A",
      "scoreValues": {
        "internal": 2,
        "external": 2,
        "process": 2,
        "team": 2
      }
    },
    {
      "name": "Development B",
      "scoreValues": {
        "internal": 1,
        "external": 2,
        "process": 2,
        "team": 1
      }
    },
    {
      "name": "Prototype A",
      "scoreValues": {
        "internal": 2,
        "external": 6,
        "process": 0,
        "team": 2
      }
    },
    {
      "name": "Prototype B",
      "scoreValues": {
        "internal": 1,
        "external": 8,
        "process": 1,
        "team": 0
      }
    },
    {
      "name": "Software Quality Assurance A",
      "scoreValues": {
        "internal": 3,
        "external": 0,
        "process": 4,
        "team": 1
      }
    },
    {
      "name": "Software Quality Assurance B",
      "scoreValues": {
        "internal": 4,
        "external": -1,
        "process": 4,
        "team": 0
      }
    },
    {
      "name": "Blank A"
    },
    {
      "name": "Blank B"
    },
    {
        "name": "Blank C"
    },
    {
        "name": "Blank D"
    },
    {
        "name": "Blank E"
    },
    {
      "name": "Pull All Nighter A",
      "scoreValues": {
        "internal": 1,
        "external": 5,
        "process": -2,
        "team": -2
      }
    },
    {
      "name": "Pull All Nighter B",
      "scoreValues": {
        "internal": 0,
        "external": 6,
        "process": -2,
        "team": -2
      }
    },
    {
      "name": "Education Workshop",
      "scoreValues": {
        "internal": 0,
        "external": 0,
        "process": 0,
        "team": 5
      },
      "intertemporalElement": {
        "weeks": 4,
        "internal": 0,
        "external": 0,
        "process": 0,
        "team": 1
      }
    },
    {
      "name": "Teammate Troubles A",
      "scoreValues": {
        "internal": -2,
        "external": 0,
        "process": -2,
        "team": -2
      }
    },
    {
      "name": "Teammate Troubles B",
      "scoreValues": {
        "internal": -1,
        "external": -2,
        "process": 0,
        "team": -1
      }
    },
    {
      "name": "Change Plans A",
      "scoreValues": {
        "internal": 0,
        "external": 0,
        "process": 0,
        "team": 0
      }
    },
    {
      "name": "Change Plans B",
      "scoreValues": {
        "internal": 0,
        "external": 0,
        "process": 0,
        "team": 0
      }
    },
    {
        "name": "Test Card",
        "scoreValues": {
            "internal": 10,
            "external": 10,
            "process": 10,
            "team": 10
        }
    },
    {
        "name": "Rebranding of Project",
        "scoreValues": {
            "internal": 0,
            "external": 0,
            "process": -5,
            "team": -5
        }
    },
    {
        "name": "Celebration of Honesty",
        "scoreValues": {
            "internal": 0,
            "external": 0,
            "process": 0,
            "team": 5
        }
    }
  ]
 }`;