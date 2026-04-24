// Auto-generated US/Canada area code → region & timezone map
  // Source: greatdata.com area code time zone chart

  export type Timezone = "EST" | "CST" | "MST" | "PST" | "AKST" | "HST" | "AST";

export interface AreaCodeInfo {
  tz: Timezone;
  region: string;
  city?: string;
}

function normalizeCityName(city?: string): string | undefined {
  if (!city) return undefined;

  const [name] = city.split(",");
  return name?.trim() || undefined;
}

const AREA_CODE_CITIES: Partial<Record<string, string>> = {
  "202": "Washington, District of Columbia",
  "206": "Seattle, Washington",
  "210": "San Antonio, Texas",
  "212": "Manhattan, New York",
  "213": "Los Angeles, California",
  "214": "Dallas, Texas",
  "281": "Houston, Texas",
  "303": "Denver, Colorado",
  "305": "Miami, Florida",
  "312": "Chicago, Illinois",
  "321": "Orlando, Florida",
  "323": "Los Angeles, California",
  "346": "Houston, Texas",
  "360": "Olympia, Washington",
  "361": "Corpus Christi, Texas",
  "404": "Atlanta, Georgia",
  "408": "San Jose, California",
  "409": "Beaumont, Texas",
  "415": "San Francisco, California",
  "469": "Dallas, Texas",
  "470": "Atlanta, Georgia",
  "480": "Mesa, Arizona",
  "503": "Portland, Oregon",
  "504": "New Orleans, Louisiana",
  "512": "Austin, Texas",
  "602": "Phoenix, Arizona",
  "617": "Boston, Massachusetts",
  "646": "Manhattan, New York",
  "650": "San Mateo, California",
  "678": "Atlanta, Georgia",
  "682": "Fort Worth, Texas",
  "702": "Las Vegas, Nevada",
  "703": "Arlington, Virginia",
  "704": "Charlotte, North Carolina",
  "713": "Houston, Texas",
  "714": "Anaheim, California",
  "718": "New York City, New York",
  "737": "Austin, Texas",
  "760": "Palm Springs, California",
  "786": "Miami, Florida",
  "787": "San Juan, Puerto Rico",
  "801": "Salt Lake City, Utah",
  "805": "Santa Barbara, California",
  "806": "Lubbock, Texas",
  "817": "Fort Worth, Texas",
  "818": "Burbank, California",
  "832": "Houston, Texas",
  "847": "Northbrook, Illinois",
  "858": "San Diego, California",
  "903": "Tyler, Texas",
  "904": "Jacksonville, Florida",
  "909": "San Bernardino, California",
  "915": "El Paso, Texas",
  "916": "Sacramento, California",
  "917": "New York City, New York",
  "929": "New York City, New York",
  "945": "Dallas, Texas",
  "971": "Portland, Oregon",
  "972": "Dallas, Texas",
};

  export const AREA_CODES: Record<string, AreaCodeInfo> = {
  "201": {
    "tz": "EST",
    "region": "New Jersey"
  },
  "202": {
    "tz": "EST",
    "region": "District of Columbia"
  },
  "203": {
    "tz": "EST",
    "region": "Connecticut"
  },
  "205": {
    "tz": "CST",
    "region": "Alabama"
  },
  "206": {
    "tz": "PST",
    "region": "Washington"
  },
  "207": {
    "tz": "EST",
    "region": "Maine"
  },
  "208": {
    "tz": "MST",
    "region": "Idaho"
  },
  "209": {
    "tz": "PST",
    "region": "California"
  },
  "210": {
    "tz": "CST",
    "region": "Texas"
  },
  "212": {
    "tz": "EST",
    "region": "New York"
  },
  "213": {
    "tz": "PST",
    "region": "California"
  },
  "214": {
    "tz": "CST",
    "region": "Texas"
  },
  "215": {
    "tz": "EST",
    "region": "Pennsylvania"
  },
  "216": {
    "tz": "EST",
    "region": "Ohio"
  },
  "217": {
    "tz": "CST",
    "region": "Illinois"
  },
  "218": {
    "tz": "CST",
    "region": "Minnesota"
  },
  "219": {
    "tz": "CST",
    "region": "Indiana"
  },
  "220": {
    "tz": "EST",
    "region": "Ohio"
  },
  "223": {
    "tz": "EST",
    "region": "Pennsylvania"
  },
  "224": {
    "tz": "CST",
    "region": "Illinois"
  },
  "225": {
    "tz": "CST",
    "region": "Louisiana"
  },
  "227": {
    "tz": "EST",
    "region": "Maryland"
  },
  "228": {
    "tz": "CST",
    "region": "Mississippi"
  },
  "229": {
    "tz": "EST",
    "region": "Georgia"
  },
  "231": {
    "tz": "EST",
    "region": "Michigan"
  },
  "234": {
    "tz": "EST",
    "region": "Ohio"
  },
  "235": {
    "tz": "CST",
    "region": "Missouri"
  },
  "239": {
    "tz": "EST",
    "region": "Florida"
  },
  "240": {
    "tz": "EST",
    "region": "Maryland"
  },
  "248": {
    "tz": "EST",
    "region": "Michigan"
  },
  "251": {
    "tz": "CST",
    "region": "Alabama"
  },
  "252": {
    "tz": "EST",
    "region": "North Carolina"
  },
  "253": {
    "tz": "PST",
    "region": "Washington"
  },
  "254": {
    "tz": "CST",
    "region": "Texas"
  },
  "256": {
    "tz": "CST",
    "region": "Alabama"
  },
  "260": {
    "tz": "EST",
    "region": "Indiana"
  },
  "262": {
    "tz": "CST",
    "region": "Wisconsin"
  },
  "267": {
    "tz": "EST",
    "region": "Pennsylvania"
  },
  "269": {
    "tz": "EST",
    "region": "Michigan"
  },
  "270": {
    "tz": "CST",
    "region": "Kentucky"
  },
  "272": {
    "tz": "EST",
    "region": "Pennsylvania"
  },
  "274": {
    "tz": "CST",
    "region": "Wisconsin"
  },
  "276": {
    "tz": "EST",
    "region": "Virginia"
  },
  "279": {
    "tz": "PST",
    "region": "California"
  },
  "281": {
    "tz": "CST",
    "region": "Texas"
  },
  "301": {
    "tz": "EST",
    "region": "Maryland"
  },
  "302": {
    "tz": "EST",
    "region": "Delaware"
  },
  "303": {
    "tz": "MST",
    "region": "Colorado"
  },
  "304": {
    "tz": "EST",
    "region": "West Virginia"
  },
  "305": {
    "tz": "EST",
    "region": "Florida"
  },
  "307": {
    "tz": "MST",
    "region": "Wyoming"
  },
  "308": {
    "tz": "CST",
    "region": "Nebraska"
  },
  "309": {
    "tz": "CST",
    "region": "Illinois"
  },
  "310": {
    "tz": "PST",
    "region": "California"
  },
  "312": {
    "tz": "CST",
    "region": "Illinois"
  },
  "313": {
    "tz": "EST",
    "region": "Michigan"
  },
  "314": {
    "tz": "CST",
    "region": "Missouri"
  },
  "315": {
    "tz": "EST",
    "region": "New York"
  },
  "316": {
    "tz": "CST",
    "region": "Kansas"
  },
  "317": {
    "tz": "EST",
    "region": "Indiana"
  },
  "318": {
    "tz": "CST",
    "region": "Louisiana"
  },
  "319": {
    "tz": "CST",
    "region": "Iowa"
  },
  "320": {
    "tz": "CST",
    "region": "Minnesota"
  },
  "321": {
    "tz": "EST",
    "region": "Florida"
  },
  "323": {
    "tz": "PST",
    "region": "California"
  },
  "324": {
    "tz": "EST",
    "region": "Florida"
  },
  "325": {
    "tz": "CST",
    "region": "Texas"
  },
  "326": {
    "tz": "EST",
    "region": "Ohio"
  },
  "327": {
    "tz": "CST",
    "region": "Arkansas"
  },
  "329": {
    "tz": "EST",
    "region": "New York"
  },
  "330": {
    "tz": "EST",
    "region": "Ohio"
  },
  "331": {
    "tz": "CST",
    "region": "Illinois"
  },
  "332": {
    "tz": "EST",
    "region": "New York"
  },
  "334": {
    "tz": "CST",
    "region": "Alabama"
  },
  "336": {
    "tz": "EST",
    "region": "North Carolina"
  },
  "337": {
    "tz": "CST",
    "region": "Louisiana"
  },
  "339": {
    "tz": "EST",
    "region": "Massachusetts"
  },
  "341": {
    "tz": "PST",
    "region": "California"
  },
  "346": {
    "tz": "CST",
    "region": "Texas"
  },
  "347": {
    "tz": "EST",
    "region": "New York"
  },
  "350": {
    "tz": "PST",
    "region": "California"
  },
  "351": {
    "tz": "EST",
    "region": "Massachusetts"
  },
  "352": {
    "tz": "EST",
    "region": "Florida"
  },
  "353": {
    "tz": "CST",
    "region": "Wisconsin"
  },
  "357": {
    "tz": "PST",
    "region": "California"
  },
  "360": {
    "tz": "PST",
    "region": "Washington"
  },
  "361": {
    "tz": "CST",
    "region": "Texas"
  },
  "363": {
    "tz": "EST",
    "region": "New York"
  },
  "364": {
    "tz": "CST",
    "region": "Kentucky"
  },
  "369": {
    "tz": "PST",
    "region": "California"
  },
  "380": {
    "tz": "EST",
    "region": "Ohio"
  },
  "385": {
    "tz": "MST",
    "region": "Utah"
  },
  "386": {
    "tz": "EST",
    "region": "Florida"
  },
  "401": {
    "tz": "EST",
    "region": "Rhode Island"
  },
  "402": {
    "tz": "CST",
    "region": "Nebraska"
  },
  "404": {
    "tz": "EST",
    "region": "Georgia"
  },
  "405": {
    "tz": "CST",
    "region": "Oklahoma"
  },
  "406": {
    "tz": "MST",
    "region": "Montana"
  },
  "407": {
    "tz": "EST",
    "region": "Florida"
  },
  "408": {
    "tz": "PST",
    "region": "California"
  },
  "409": {
    "tz": "CST",
    "region": "Texas"
  },
  "410": {
    "tz": "EST",
    "region": "Maryland"
  },
  "412": {
    "tz": "EST",
    "region": "Pennsylvania"
  },
  "413": {
    "tz": "EST",
    "region": "Massachusetts"
  },
  "414": {
    "tz": "CST",
    "region": "Wisconsin"
  },
  "415": {
    "tz": "PST",
    "region": "California"
  },
  "417": {
    "tz": "CST",
    "region": "Missouri"
  },
  "419": {
    "tz": "EST",
    "region": "Ohio"
  },
  "423": {
    "tz": "EST",
    "region": "Tennessee"
  },
  "424": {
    "tz": "PST",
    "region": "California"
  },
  "425": {
    "tz": "PST",
    "region": "Washington"
  },
  "430": {
    "tz": "CST",
    "region": "Texas"
  },
  "432": {
    "tz": "CST",
    "region": "Texas"
  },
  "434": {
    "tz": "EST",
    "region": "Virginia"
  },
  "435": {
    "tz": "MST",
    "region": "Utah"
  },
  "436": {
    "tz": "EST",
    "region": "Ohio"
  },
  "440": {
    "tz": "EST",
    "region": "Ohio"
  },
  "442": {
    "tz": "PST",
    "region": "California"
  },
  "443": {
    "tz": "EST",
    "region": "Maryland"
  },
  "445": {
    "tz": "EST",
    "region": "Pennsylvania"
  },
  "447": {
    "tz": "CST",
    "region": "Illinois"
  },
  "448": {
    "tz": "CST",
    "region": "Florida"
  },
  "457": {
    "tz": "CST",
    "region": "Louisiana"
  },
  "458": {
    "tz": "PST",
    "region": "Oregon"
  },
  "463": {
    "tz": "EST",
    "region": "Indiana"
  },
  "464": {
    "tz": "CST",
    "region": "Illinois"
  },
  "469": {
    "tz": "CST",
    "region": "Texas"
  },
  "470": {
    "tz": "EST",
    "region": "Georgia"
  },
  "471": {
    "tz": "CST",
    "region": "Mississippi"
  },
  "472": {
    "tz": "EST",
    "region": "North Carolina"
  },
  "475": {
    "tz": "EST",
    "region": "Connecticut"
  },
  "478": {
    "tz": "EST",
    "region": "Georgia"
  },
  "479": {
    "tz": "CST",
    "region": "Arkansas"
  },
  "480": {
    "tz": "MST",
    "region": "Arizona"
  },
  "483": {
    "tz": "CST",
    "region": "Alabama"
  },
  "484": {
    "tz": "EST",
    "region": "Pennsylvania"
  },
  "501": {
    "tz": "CST",
    "region": "Arkansas"
  },
  "502": {
    "tz": "EST",
    "region": "Kentucky"
  },
  "503": {
    "tz": "PST",
    "region": "Oregon"
  },
  "504": {
    "tz": "CST",
    "region": "Louisiana"
  },
  "505": {
    "tz": "MST",
    "region": "New Mexico"
  },
  "507": {
    "tz": "CST",
    "region": "Minnesota"
  },
  "508": {
    "tz": "EST",
    "region": "Massachusetts"
  },
  "509": {
    "tz": "PST",
    "region": "Washington"
  },
  "510": {
    "tz": "PST",
    "region": "California"
  },
  "512": {
    "tz": "CST",
    "region": "Texas"
  },
  "513": {
    "tz": "EST",
    "region": "Ohio"
  },
  "515": {
    "tz": "CST",
    "region": "Iowa"
  },
  "516": {
    "tz": "EST",
    "region": "New York"
  },
  "517": {
    "tz": "EST",
    "region": "Michigan"
  },
  "518": {
    "tz": "EST",
    "region": "New York"
  },
  "520": {
    "tz": "MST",
    "region": "Arizona"
  },
  "530": {
    "tz": "PST",
    "region": "California"
  },
  "531": {
    "tz": "CST",
    "region": "Nebraska"
  },
  "534": {
    "tz": "CST",
    "region": "Wisconsin"
  },
  "539": {
    "tz": "CST",
    "region": "Oklahoma"
  },
  "540": {
    "tz": "EST",
    "region": "Virginia"
  },
  "541": {
    "tz": "PST",
    "region": "Oregon"
  },
  "551": {
    "tz": "EST",
    "region": "New Jersey"
  },
  "557": {
    "tz": "CST",
    "region": "Missouri"
  },
  "559": {
    "tz": "PST",
    "region": "California"
  },
  "561": {
    "tz": "EST",
    "region": "Florida"
  },
  "562": {
    "tz": "PST",
    "region": "California"
  },
  "563": {
    "tz": "CST",
    "region": "Iowa"
  },
  "564": {
    "tz": "PST",
    "region": "Washington"
  },
  "567": {
    "tz": "EST",
    "region": "Ohio"
  },
  "570": {
    "tz": "EST",
    "region": "Pennsylvania"
  },
  "571": {
    "tz": "EST",
    "region": "Virginia"
  },
  "572": {
    "tz": "CST",
    "region": "Oklahoma"
  },
  "573": {
    "tz": "CST",
    "region": "Missouri"
  },
  "574": {
    "tz": "EST",
    "region": "Indiana"
  },
  "575": {
    "tz": "MST",
    "region": "New Mexico"
  },
  "580": {
    "tz": "CST",
    "region": "Oklahoma"
  },
  "582": {
    "tz": "EST",
    "region": "Pennsylvania"
  },
  "585": {
    "tz": "EST",
    "region": "New York"
  },
  "586": {
    "tz": "EST",
    "region": "Michigan"
  },
  "601": {
    "tz": "CST",
    "region": "Mississippi"
  },
  "602": {
    "tz": "MST",
    "region": "Arizona"
  },
  "603": {
    "tz": "EST",
    "region": "New Hampshire"
  },
  "605": {
    "tz": "CST",
    "region": "South Dakota"
  },
  "606": {
    "tz": "EST",
    "region": "Kentucky"
  },
  "607": {
    "tz": "EST",
    "region": "New York"
  },
  "608": {
    "tz": "CST",
    "region": "Wisconsin"
  },
  "609": {
    "tz": "EST",
    "region": "New Jersey"
  },
  "610": {
    "tz": "EST",
    "region": "Pennsylvania"
  },
  "612": {
    "tz": "CST",
    "region": "Minnesota"
  },
  "614": {
    "tz": "EST",
    "region": "Ohio"
  },
  "615": {
    "tz": "CST",
    "region": "Tennessee"
  },
  "616": {
    "tz": "EST",
    "region": "Michigan"
  },
  "617": {
    "tz": "EST",
    "region": "Massachusetts"
  },
  "618": {
    "tz": "CST",
    "region": "Illinois"
  },
  "619": {
    "tz": "PST",
    "region": "California"
  },
  "620": {
    "tz": "CST",
    "region": "Kansas"
  },
  "623": {
    "tz": "MST",
    "region": "Arizona"
  },
  "624": {
    "tz": "EST",
    "region": "New York"
  },
  "626": {
    "tz": "PST",
    "region": "California"
  },
  "628": {
    "tz": "PST",
    "region": "California"
  },
  "629": {
    "tz": "CST",
    "region": "Tennessee"
  },
  "630": {
    "tz": "CST",
    "region": "Illinois"
  },
  "631": {
    "tz": "EST",
    "region": "New York"
  },
  "636": {
    "tz": "CST",
    "region": "Missouri"
  },
  "640": {
    "tz": "EST",
    "region": "New Jersey"
  },
  "641": {
    "tz": "CST",
    "region": "Iowa"
  },
  "645": {
    "tz": "EST",
    "region": "Florida"
  },
  "646": {
    "tz": "EST",
    "region": "New York"
  },
  "650": {
    "tz": "PST",
    "region": "California"
  },
  "651": {
    "tz": "CST",
    "region": "Minnesota"
  },
  "656": {
    "tz": "EST",
    "region": "Florida"
  },
  "657": {
    "tz": "PST",
    "region": "California"
  },
  "659": {
    "tz": "CST",
    "region": "Alabama"
  },
  "660": {
    "tz": "CST",
    "region": "Missouri"
  },
  "661": {
    "tz": "PST",
    "region": "California"
  },
  "662": {
    "tz": "CST",
    "region": "Mississippi"
  },
  "667": {
    "tz": "EST",
    "region": "Maryland"
  },
  "669": {
    "tz": "PST",
    "region": "California"
  },
  "678": {
    "tz": "EST",
    "region": "Georgia"
  },
  "679": {
    "tz": "EST",
    "region": "Michigan"
  },
  "680": {
    "tz": "EST",
    "region": "New York"
  },
  "681": {
    "tz": "EST",
    "region": "West Virginia"
  },
  "682": {
    "tz": "CST",
    "region": "Texas"
  },
  "686": {
    "tz": "EST",
    "region": "Virginia"
  },
  "689": {
    "tz": "EST",
    "region": "Florida"
  },
  "701": {
    "tz": "CST",
    "region": "North Dakota"
  },
  "702": {
    "tz": "PST",
    "region": "Nevada"
  },
  "703": {
    "tz": "EST",
    "region": "Virginia"
  },
  "704": {
    "tz": "EST",
    "region": "North Carolina"
  },
  "706": {
    "tz": "EST",
    "region": "Georgia"
  },
  "707": {
    "tz": "PST",
    "region": "California"
  },
  "708": {
    "tz": "CST",
    "region": "Illinois"
  },
  "712": {
    "tz": "CST",
    "region": "Iowa"
  },
  "713": {
    "tz": "CST",
    "region": "Texas"
  },
  "714": {
    "tz": "PST",
    "region": "California"
  },
  "715": {
    "tz": "CST",
    "region": "Wisconsin"
  },
  "716": {
    "tz": "EST",
    "region": "New York"
  },
  "717": {
    "tz": "EST",
    "region": "Pennsylvania"
  },
  "718": {
    "tz": "EST",
    "region": "New York"
  },
  "719": {
    "tz": "MST",
    "region": "Colorado"
  },
  "720": {
    "tz": "MST",
    "region": "Colorado"
  },
  "724": {
    "tz": "EST",
    "region": "Pennsylvania"
  },
  "725": {
    "tz": "PST",
    "region": "Nevada"
  },
  "726": {
    "tz": "CST",
    "region": "Texas"
  },
  "727": {
    "tz": "EST",
    "region": "Florida"
  },
  "728": {
    "tz": "EST",
    "region": "Florida"
  },
  "729": {
    "tz": "EST",
    "region": "Tennessee"
  },
  "730": {
    "tz": "CST",
    "region": "Illinois"
  },
  "731": {
    "tz": "CST",
    "region": "Tennessee"
  },
  "732": {
    "tz": "EST",
    "region": "New Jersey"
  },
  "734": {
    "tz": "EST",
    "region": "Michigan"
  },
  "737": {
    "tz": "CST",
    "region": "Texas"
  },
  "738": {
    "tz": "PST",
    "region": "California"
  },
  "740": {
    "tz": "EST",
    "region": "Ohio"
  },
  "743": {
    "tz": "EST",
    "region": "North Carolina"
  },
  "747": {
    "tz": "PST",
    "region": "California"
  },
  "748": {
    "tz": "MST",
    "region": "Colorado"
  },
  "754": {
    "tz": "EST",
    "region": "Florida"
  },
  "757": {
    "tz": "EST",
    "region": "Virginia"
  },
  "760": {
    "tz": "PST",
    "region": "California"
  },
  "762": {
    "tz": "EST",
    "region": "Georgia"
  },
  "763": {
    "tz": "CST",
    "region": "Minnesota"
  },
  "765": {
    "tz": "EST",
    "region": "Indiana"
  },
  "769": {
    "tz": "CST",
    "region": "Mississippi"
  },
  "770": {
    "tz": "EST",
    "region": "Georgia"
  },
  "771": {
    "tz": "EST",
    "region": "District of Columbia"
  },
  "772": {
    "tz": "EST",
    "region": "Florida"
  },
  "773": {
    "tz": "CST",
    "region": "Illinois"
  },
  "774": {
    "tz": "EST",
    "region": "Massachusetts"
  },
  "775": {
    "tz": "PST",
    "region": "Nevada"
  },
  "779": {
    "tz": "CST",
    "region": "Illinois"
  },
  "781": {
    "tz": "EST",
    "region": "Massachusetts"
  },
  "785": {
    "tz": "CST",
    "region": "Kansas"
  },
  "786": {
    "tz": "EST",
    "region": "Florida"
  },
  "801": {
    "tz": "MST",
    "region": "Utah"
  },
  "802": {
    "tz": "EST",
    "region": "Vermont"
  },
  "803": {
    "tz": "EST",
    "region": "South Carolina"
  },
  "804": {
    "tz": "EST",
    "region": "Virginia"
  },
  "805": {
    "tz": "PST",
    "region": "California"
  },
  "806": {
    "tz": "CST",
    "region": "Texas"
  },
  "810": {
    "tz": "EST",
    "region": "Michigan"
  },
  "812": {
    "tz": "EST",
    "region": "Indiana"
  },
  "813": {
    "tz": "EST",
    "region": "Florida"
  },
  "814": {
    "tz": "EST",
    "region": "Pennsylvania"
  },
  "815": {
    "tz": "CST",
    "region": "Illinois"
  },
  "816": {
    "tz": "CST",
    "region": "Missouri"
  },
  "817": {
    "tz": "CST",
    "region": "Texas"
  },
  "818": {
    "tz": "PST",
    "region": "California"
  },
  "820": {
    "tz": "PST",
    "region": "California"
  },
  "821": {
    "tz": "EST",
    "region": "South Carolina"
  },
  "826": {
    "tz": "EST",
    "region": "Virginia"
  },
  "828": {
    "tz": "EST",
    "region": "North Carolina"
  },
  "830": {
    "tz": "CST",
    "region": "Texas"
  },
  "831": {
    "tz": "PST",
    "region": "California"
  },
  "832": {
    "tz": "CST",
    "region": "Texas"
  },
  "835": {
    "tz": "EST",
    "region": "Pennsylvania"
  },
  "838": {
    "tz": "EST",
    "region": "New York"
  },
  "839": {
    "tz": "EST",
    "region": "South Carolina"
  },
  "840": {
    "tz": "PST",
    "region": "California"
  },
  "843": {
    "tz": "EST",
    "region": "South Carolina"
  },
  "845": {
    "tz": "EST",
    "region": "New York"
  },
  "847": {
    "tz": "CST",
    "region": "Illinois"
  },
  "848": {
    "tz": "EST",
    "region": "New Jersey"
  },
  "850": {
    "tz": "CST",
    "region": "Florida"
  },
  "854": {
    "tz": "EST",
    "region": "South Carolina"
  },
  "856": {
    "tz": "EST",
    "region": "New Jersey"
  },
  "857": {
    "tz": "EST",
    "region": "Massachusetts"
  },
  "858": {
    "tz": "PST",
    "region": "California"
  },
  "859": {
    "tz": "EST",
    "region": "Kentucky"
  },
  "860": {
    "tz": "EST",
    "region": "Connecticut"
  },
  "861": {
    "tz": "CST",
    "region": "Illinois"
  },
  "862": {
    "tz": "EST",
    "region": "New Jersey"
  },
  "863": {
    "tz": "EST",
    "region": "Florida"
  },
  "864": {
    "tz": "EST",
    "region": "South Carolina"
  },
  "865": {
    "tz": "EST",
    "region": "Tennessee"
  },
  "870": {
    "tz": "CST",
    "region": "Arkansas"
  },
  "872": {
    "tz": "CST",
    "region": "Illinois"
  },
  "878": {
    "tz": "EST",
    "region": "Pennsylvania"
  },
  "901": {
    "tz": "CST",
    "region": "Tennessee"
  },
  "903": {
    "tz": "CST",
    "region": "Texas"
  },
  "904": {
    "tz": "EST",
    "region": "Florida"
  },
  "906": {
    "tz": "EST",
    "region": "Michigan"
  },
  "907": {
    "tz": "AKST",
    "region": "Alaska"
  },
  "908": {
    "tz": "EST",
    "region": "New Jersey"
  },
  "909": {
    "tz": "PST",
    "region": "California"
  },
  "910": {
    "tz": "EST",
    "region": "North Carolina"
  },
  "912": {
    "tz": "EST",
    "region": "Georgia"
  },
  "913": {
    "tz": "CST",
    "region": "Kansas"
  },
  "914": {
    "tz": "EST",
    "region": "New York"
  },
  "915": {
    "tz": "MST",
    "region": "Texas"
  },
  "916": {
    "tz": "PST",
    "region": "California"
  },
  "917": {
    "tz": "EST",
    "region": "New York"
  },
  "918": {
    "tz": "CST",
    "region": "Oklahoma"
  },
  "919": {
    "tz": "EST",
    "region": "North Carolina"
  },
  "920": {
    "tz": "CST",
    "region": "Wisconsin"
  },
  "924": {
    "tz": "CST",
    "region": "Minnesota"
  },
  "925": {
    "tz": "PST",
    "region": "California"
  },
  "928": {
    "tz": "MST",
    "region": "Arizona"
  },
  "929": {
    "tz": "EST",
    "region": "New York"
  },
  "930": {
    "tz": "EST",
    "region": "Indiana"
  },
  "931": {
    "tz": "CST",
    "region": "Tennessee"
  },
  "934": {
    "tz": "EST",
    "region": "New York"
  },
  "936": {
    "tz": "CST",
    "region": "Texas"
  },
  "937": {
    "tz": "EST",
    "region": "Ohio"
  },
  "938": {
    "tz": "CST",
    "region": "Alabama"
  },
  "940": {
    "tz": "CST",
    "region": "Texas"
  },
  "941": {
    "tz": "EST",
    "region": "Florida"
  },
  "943": {
    "tz": "EST",
    "region": "Georgia"
  },
  "945": {
    "tz": "CST",
    "region": "Texas"
  },
  "947": {
    "tz": "EST",
    "region": "Michigan"
  },
  "948": {
    "tz": "EST",
    "region": "Virginia"
  },
  "949": {
    "tz": "PST",
    "region": "California"
  },
  "951": {
    "tz": "PST",
    "region": "California"
  },
  "952": {
    "tz": "CST",
    "region": "Minnesota"
  },
  "954": {
    "tz": "EST",
    "region": "Florida"
  },
  "956": {
    "tz": "CST",
    "region": "Texas"
  },
  "959": {
    "tz": "EST",
    "region": "Connecticut"
  },
  "970": {
    "tz": "MST",
    "region": "Colorado"
  },
  "971": {
    "tz": "PST",
    "region": "Oregon"
  },
  "972": {
    "tz": "CST",
    "region": "Texas"
  },
  "973": {
    "tz": "EST",
    "region": "New Jersey"
  },
  "975": {
    "tz": "CST",
    "region": "Missouri"
  },
  "978": {
    "tz": "EST",
    "region": "Massachusetts"
  },
  "979": {
    "tz": "CST",
    "region": "Texas"
  },
  "980": {
    "tz": "EST",
    "region": "North Carolina"
  },
  "983": {
    "tz": "MST",
    "region": "Colorado"
  },
  "984": {
    "tz": "EST",
    "region": "North Carolina"
  },
  "985": {
    "tz": "CST",
    "region": "Louisiana"
  },
  "986": {
    "tz": "MST",
    "region": "Idaho"
  },
  "989": {
    "tz": "EST",
    "region": "Michigan"
  }
};

  const TZ_TO_IANA: Record<Timezone, string> = {
    EST: "America/New_York",
    CST: "America/Chicago",
    MST: "America/Denver",
    PST: "America/Los_Angeles",
    AKST: "America/Anchorage",
    HST: "Pacific/Honolulu",
    AST: "America/Halifax",
  };

  const TZ_LABEL: Record<Timezone, string> = {
    EST: "Eastern",
    CST: "Central",
    MST: "Mountain",
    PST: "Pacific",
    AKST: "Alaska",
    HST: "Hawaii",
    AST: "Atlantic",
  };

  export function lookupAreaCode(areaCode: string): AreaCodeInfo | null {
    const info = AREA_CODES[areaCode];
    if (!info) return null;

  return {
    ...info,
    city: normalizeCityName(AREA_CODE_CITIES[areaCode]),
  };
}

  export function getCurrentTimeForTz(tz: Timezone, date = new Date()): string {
    return date.toLocaleTimeString("en-US", {
      timeZone: TZ_TO_IANA[tz],
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  export function getTzLabel(tz: Timezone): string {
    return TZ_LABEL[tz];
  }

  export function extractAreaCode(input: string): string | null {
    const digits = input.replace(/\D/g, "");
    if (digits.length === 10) return digits.slice(0, 3);
    if (digits.length === 11 && digits.startsWith("1")) return digits.slice(1, 4);
    if (digits.length === 3) return digits;
    return null;
  }
  
