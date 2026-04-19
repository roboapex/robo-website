export interface CompetitionEvent {
  regions: { [k: string]: CompetitionRegion }
}

export interface CompetitionRegion {
  name: string;
  website?: string;
}

export type CompetitionRegionCode = string
export type CompetitionEventCode = "nrc" | "robocup" | "fll" | "ide" | "apyrc" | "vex" | "bullseye" | "roborave" | "makex" | "wro" | "ftc" | "blanks"
export const CompetitionCodes: { [k in CompetitionEventCode]: CompetitionEvent } = {
  nrc: {
    regions: {
      sg: {
        name: "National Robotics Competition (Singapore)",
        website: "https://ducklearning.com/pages/nrc-sg"
      }
    }
  },
  robocup: {
    regions: {
      sg: {
        name: "Robocup Singapore Open",
        website: "https://robocupsg.org/en/singaporeopen",
      },
      aptji: {
        name: "RoboCup Asia-Pacific Tianjin Invitational Tournament"
      },
      icool: {
        name: "International CoSpace OnLine (iCooL) Challenge @Virtual RoboCup",
        website: "https://robocupap.org/icool2020/"
      }
    }
  },
  fll: {
    regions: {
      sg: {
        name: "First LEGO League",
        website: "https://www.firstlegoleague.org/",
      }
    }
  },
  ide: {
    regions: {
      sg: {
        name: "IDE (Innovation, Design and Engineering) Series",
        website: "https://ideseries.org/",
      }
    }
  },
  apyrc: {
    regions: {
      sg: {
        name: "Asia Pacific Youth Robotics Competition",
        website: "https://apyrc.com/"
      },
    }
  },
  vex: {
    regions: {
      sg: {
        name: "Singapore VEX Robotics Competition"
      },
      ap: {
        name: "Asia-Pacific VEX Robotics Championship"
      },
      world: {
        name: "VEX Robotics World Championship"
      }
    }
  },
  bullseye: {
    regions: {
      sg: {
        name: "Bull’s Eye Competition",
        website: "https://victoria.moe.edu.sg/bulls-eye-competition/"
      }
    }
  },
  roborave: {
    regions: {
      kaga: {
        name: "RoboRave Kaga Japan",
        website: "https://www.roborave-kaga.com/"
      },
      int: {
        name: "RoboRave International",
        website: "http://roborave.itccc.org.cn/"
      }
    }
  },
  makex: {
    regions: {
      sg: {
        name: "MakeX Robotics Competition Singapore",
        website: "https://www.makexsg.com/"
      },
      world: {
        name: "",
        website: "https://www.makex.cc/en"
      }
    }
  },
  wro: {
    regions: {
      sg: {
        name: "World Robot Olympiad",
        website: "https://wro-association.org/"
      }
    }
  },
  ftc: {
    regions: {
      sg: {
        name: "FIRST Tech Challenge Singapore",
        website: "https://www.firstinspires.org/ftc"
      }
    }
  },
  blanks: {
    regions: {
      sg: {
        name: "Blank's Beginnings"
      }
    }
  }
};