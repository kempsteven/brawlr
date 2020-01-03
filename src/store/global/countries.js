import { getField, updateField } from 'vuex-map-fields'

export const state = {
    countries: [
        { "id": 1, "value": "Afghanistan" }, { "id": 2, "value": "Albania" }, { "id": 3, "value": "Algeria" }, { "id": 4, "value": "American Samoa" }, 
        { "id": 5, "value": "Andorra" }, { "id": 6, "value": "Angola" }, { "id": 7, "value": "Anguilla" }, { "id": 8, "value": "Antarctica" }, 
        { "id": 9, "value": "Antigua and Barbuda" }, { "id": 10, "value": "Argentina" }, { "id": 11, "value": "Armenia" }, { "id": 12, "value": "Aruba" }, 
        { "id": 13, "value": "Australia" }, { "id": 14, "value": "Austria" }, { "id": 15, "value": "Azerbaijan" }, { "id": 16, "value": "Bahamas (the)" }, 
        { "id": 17, "value": "Bahrain" }, { "id": 18, "value": "Bangladesh" }, { "id": 19, "value": "Barbados" }, { "id": 20, "value": "Belarus" }, 
        { "id": 21, "value": "Belgium" }, { "id": 22, "value": "Belize" }, { "id": 23, "value": "Benin" }, { "id": 24, "value": "Bermuda" }, 
        { "id": 25, "value": "Bhutan" }, { "id": 26, "value": "Bolivia (Plurinational State of)" }, { "id": 27, "value": "Bonaire, Sint Eustatius and Saba" }, 
        { "id": 28, "value": "Bosnia and Herzegovina" }, { "id": 29, "value": "Botswana" }, { "id": 30, "value": "Bouvet Island" }, { "id": 31, "value": "Brazil" }, 
        { "id": 32, "value": "British Indian Ocean Territory (the)" }, { "id": 33, "value": "Brunei Darussalam" }, { "id": 34, "value": "Bulgaria" },
        { "id": 35, "value": "Burkina Faso" }, { "id": 36, "value": "Burundi" }, { "id": 37, "value": "Cabo Verde" }, { "id": 38, "value": "Cambodia" }, 
        { "id": 39, "value": "Cameroon" }, { "id": 40, "value": "Canada" }, { "id": 41, "value": "Cayman Islands (the)" }, { "id": 42, "value": "Central African Republic (the)" }, 
        { "id": 43, "value": "Chad" }, { "id": 44, "value": "Chile" }, { "id": 45, "value": "China" }, { "id": 46, "value": "Christmas Island" }, 
        { "id": 47, "value": "Cocos (Keeling) Islands (the)" }, { "id": 48, "value": "Colombia" }, { "id": 49, "value": "Comoros (the)" }, 
        { "id": 50, "value": "Congo (the Democratic Republic of the)" }, { "id": 51, "value": "Congo (the)" }, { "id": 52, "value": "Cook Islands (the)" }, 
        { "id": 53, "value": "Costa Rica" }, { "id": 54, "value": "Croatia" }, { "id": 55, "value": "Cuba" }, { "id": 56, "value": "Curaçao" }, { "id": 57, "value": "Cyprus" }, 
        { "id": 58, "value": "Czechia" }, { "id": 59, "value": "Côte d'Ivoire" }, { "id": 60, "value": "Denmark" }, { "id": 61, "value": "Djibouti" }, 
        { "id": 62, "value": "Dominica" }, { "id": 63, "value": "Dominican Republic (the)" }, { "id": 64, "value": "Ecuador" }, { "id": 65, "value": "Egypt" }, 
        { "id": 66, "value": "El Salvador" }, { "id": 67, "value": "Equatorial Guinea" }, { "id": 68, "value": "Eritrea" }, { "id": 69, "value": "Estonia" }, 
        { "id": 70, "value": "Eswatini" }, { "id": 71, "value": "Ethiopia" }, { "id": 72, "value": "Falkland Islands (the) [Malvinas]" }, { "id": 73, "value": "Faroe Islands (the)" },
        { "id": 74, "value": "Fiji" }, { "id": 75, "value": "Finland" }, { "id": 76, "value": "France" }, { "id": 77, "value": "French Guiana" }, 
        { "id": 78, "value": "French Polynesia" }, { "id": 79, "value": "French Southern Territories (the)" }, { "id": 80, "value": "Gabon" }, { "id": 81, "value": "Gambia (the)" }, 
        { "id": 82, "value": "Georgia" }, { "id": 83, "value": "Germany" }, { "id": 84, "value": "Ghana" }, { "id": 85, "value": "Gibraltar" }, 
        { "id": 86, "value": "Greece" }, { "id": 87, "value": "Greenland" }, { "id": 88, "value": "Grenada" }, { "id": 89, "value": "Guadeloupe" }, { "id": 90, "value": "Guam" }, 
        { "id": 91, "value": "Guatemala" }, { "id": 92, "value": "Guernsey" }, { "id": 93, "value": "Guinea" }, { "id": 94, "value": "Guinea-Bissau" }, 
        { "id": 95, "value": "Guyana" }, { "id": 96, "value": "Haiti" }, { "id": 97, "value": "Heard Island and McDonald Islands" }, { "id": 98, "value": "Holy See (the)" }, 
        { "id": 99, "value": "Honduras" }, { "id": 100, "value": "Hong Kong" }, { "id": 101, "value": "Hungary" }, { "id": 102, "value": "Iceland" },
        { "id": 103, "value": "India" }, { "id": 104, "value": "Indonesia" }, { "id": 105, "value": "Iran (Islamic Republic of)" }, { "id": 106, "value": "Iraq" }, 
        { "id": 107, "value": "Ireland" }, { "id": 108, "value": "Isle of Man" }, { "id": 109, "value": "Israel" }, { "id": 110, "value": "Italy" }, 
        { "id": 111, "value": "Jamaica" }, { "id": 112, "value": "Japan" }, { "id": 113, "value": "Jersey" }, { "id": 114, "value": "Jordan" }, 
        { "id": 115, "value": "Kazakhstan" }, { "id": 116, "value": "Kenya" }, { "id": 117, "value": "Kiribati" }, 
        { "id": 118, "value": "Korea (the Democratic People's Republic of)" }, { "id": 119, "value": "Korea (the Republic of)" }, { "id": 120, "value": "Kuwait" }, 
        { "id": 121, "value": "Kyrgyzstan" }, { "id": 122, "value": "Lao People's Democratic Republic (the)" }, { "id": 123, "value": "Latvia" }, 
        { "id": 124, "value": "Lebanon" }, { "id": 125, "value": "Lesotho" }, { "id": 126, "value": "Liberia" }, { "id": 127, "value": "Libya" }, 
        { "id": 128, "value": "Liechtenstein" }, { "id": 129, "value": "Lithuania" }, { "id": 130, "value": "Luxembourg" }, { "id": 131, "value": "Macao" }, 
        { "id": 132, "value": "Madagascar" }, { "id": 133, "value": "Malawi" }, { "id": 134, "value": "Malaysia" }, { "id": 135, "value": "Maldives" }, 
        { "id": 136, "value": "Mali" }, { "id": 137, "value": "Malta" }, { "id": 138, "value": "Marshall Islands (the)" }, { "id": 139, "value": "Martinique" }, 
        { "id": 140, "value": "Mauritania" }, { "id": 141, "value": "Mauritius" }, { "id": 142, "value": "Mayotte" }, { "id": 143, "value": "Mexico" }, 
        { "id": 144, "value": "Micronesia (Federated States of)" }, { "id": 145, "value": "Moldova (the Republic of)" }, { "id": 146, "value": "Monaco" }, 
        { "id": 147, "value": "Mongolia" }, { "id": 148, "value": "Montenegro" }, { "id": 149, "value": "Montserrat" }, { "id": 150, "value": "Morocco" }, 
        { "id": 151, "value": "Mozambique" }, { "id": 152, "value": "Myanmar" }, { "id": 153, "value": "Namibia" }, { "id": 154, "value": "Nauru" }, 
        { "id": 155, "value": "Nepal" }, { "id": 156, "value": "Netherlands (the)" }, { "id": 157, "value": "New Caledonia" }, { "id": 158, "value": "New Zealand" }, 
        { "id": 159, "value": "Nicaragua" }, { "id": 160, "value": "Niger (the)" }, { "id": 161, "value": "Nigeria" }, { "id": 162, "value": "Niue" }, 
        { "id": 163, "value": "Norfolk Island" }, { "id": 164, "value": "Northern Mariana Islands (the)" }, { "id": 165, "value": "Norway" }, 
        { "id": 166, "value": "Oman" }, { "id": 167, "value": "Pakistan" }, { "id": 168, "value": "Palau" }, { "id": 169, "value": "Palestine, State of" }, 
        { "id": 170, "value": "Panama" }, { "id": 171, "value": "Papua New Guinea" }, { "id": 172, "value": "Paraguay" }, { "id": 173, "value": "Peru" },
        { "id": 174, "value": "Philippines (the)" }, { "id": 175, "value": "Pitcairn" }, { "id": 176, "value": "Poland" }, { "id": 177, "value": "Portugal" },
        { "id": 178, "value": "Puerto Rico" }, { "id": 179, "value": "Qatar" }, { "id": 180, "value": "Republic of North Macedonia" }, { "id": 181, "value": "Romania" },
        { "id": 182, "value": "Russian Federation (the)" }, { "id": 183, "value": "Rwanda" }, { "id": 184, "value": "Réunion" }, { "id": 185, "value": "Saint Barthélemy" }, 
        { "id": 186, "value": "Saint Helena, Ascension and Tristan da Cunha" }, { "id": 187, "value": "Saint Kitts and Nevis" }, { "id": 188, "value": "Saint Lucia" }, 
        { "id": 189, "value": "Saint Martin (French part)" }, { "id": 190, "value": "Saint Pierre and Miquelon" }, { "id": 191, "value": "Saint Vincent and the Grenadines" }, 
        { "id": 192, "value": "Samoa" }, { "id": 193, "value": "San Marino" }, { "id": 194, "value": "Sao Tome and Principe" }, { "id": 195, "value": "Saudi Arabia" }, 
        { "id": 196, "value": "Senegal" }, { "id": 197, "value": "Serbia" }, { "id": 198, "value": "Seychelles" }, { "id": 199, "value": "Sierra Leone" }, 
        { "id": 200, "value": "Singapore" }, { "id": 201, "value": "Sint Maarten (Dutch part)" }, { "id": 202, "value": "Slovakia" }, { "id": 203, "value": "Slovenia" }, 
        { "id": 204, "value": "Solomon Islands" }, { "id": 205, "value": "Somalia" }, { "id": 206, "value": "South Africa" }, 
        { "id": 207, "value": "South Georgia and the South Sandwich Islands" }, { "id": 208, "value": "South Sudan" }, { "id": 209, "value": "Spain" }, 
        { "id": 210, "value": "Sri Lanka" }, { "id": 211, "value": "Sudan (the)" }, { "id": 212, "value": "Suriname" }, { "id": 213, "value": "Svalbard and Jan Mayen" },
        { "id": 214, "value": "Sweden" }, { "id": 215, "value": "Switzerland" }, { "id": 216, "value": "Syrian Arab Republic" }, 
        { "id": 217, "value": "Taiwan (Province of China)" }, { "id": 218, "value": "Tajikistan" }, { "id": 219, "value": "Tanzania, United Republic of" }, 
        { "id": 220, "value": "Thailand" }, { "id": 221, "value": "Timor-Leste" }, { "id": 222, "value": "Togo" }, { "id": 223, "value": "Tokelau" },
        { "id": 224, "value": "Tonga" }, { "id": 225, "value": "Trinidad and Tobago" }, { "id": 226, "value": "Tunisia" }, { "id": 227, "value": "Turkey" },
        { "id": 228, "value": "Turkmenistan" }, { "id": 229, "value": "Turks and Caicos Islands (the)" }, { "id": 230, "value": "Tuvalu" }, { "id": 231, "value": "Uganda" },
        { "id": 232, "value": "Ukraine" }, { "id": 233, "value": "United Arab Emirates (the)" },
        { "id": 234, "value": "United Kingdom of Great Britain and Northern Ireland (the)" }, { "id": 235, "value": "United States Minor Outlying Islands (the)" },
        { "id": 236, "value": "United States of America (the)" }, { "id": 237, "value": "Uruguay" }, { "id": 238, "value": "Uzbekistan" }, { "id": 239, "value": "Vanuatu" },
        { "id": 240, "value": "Venezuela (Bolivarian Republic of)" }, { "id": 241, "value": "Viet Nam" }, { "id": 242, "value": "Virgin Islands (British)" }, 
        { "id": 243, "value": "Virgin Islands (U.S.)" }, { "id": 244, "value": "Wallis and Futuna" }, { "id": 245, "value": "Western Sahara" }, 
        { "id": 246, "value": "Yemen" }, { "id": 247, "value": "Zambia" }, { "id": 248, "value": "Zimbabwe" }, { "id": 249, "value": "Åland Islands" }
    ]
}

export const actions = {
}

export const mutations = {
    updateField
}

const getters = {
    getField
}

export default {
    state,
    actions,
    mutations,
    getters
}