export interface ICountryMap{
    name: string;
    cc: string;
    symbol: string;
    phone: number;
    currency: string;
    capital: string;
    alpha_3: string;
    id: number;
} 
export const CountriesMap: ICountryMap[] =  [
    {"name":"Afghanistan","cc":"AF","id":1,"phone":93,"symbol":"؋","capital":"Kabul","currency":"AFN","alpha_3":"AFG"},
    {"name":"Aland Islands","cc":"AX","id":2,"phone":358,"symbol":"€","capital":"Mariehamn","currency":"EUR","alpha_3":"ALA"},
    {"name":"Albania","cc":"AL","id":3,"phone":355,"symbol":"Lek","capital":"Tirana","currency":"ALL","alpha_3":"ALB"},
    {"name":"Algeria","cc":"DZ","id":4,"phone":213,"symbol":"دج","capital":"Algiers","currency":"DZD","alpha_3":"DZA"},
    {"name":"American Samoa","cc":"AS","id":5,"phone":1684,"symbol":"$","capital":"Pago Pago","currency":"USD","alpha_3":"ASM"},
    {"name":"Andorra","cc":"AD","id":6,"phone":376,"symbol":"€","capital":"Andorra la Vella","currency":"EUR","alpha_3":"AND"},
    {"name":"Angola","cc":"AO","id":7,"phone":244,"symbol":"Kz","capital":"Luanda","currency":"AOA","alpha_3":"AGO"},
    {"name":"Anguilla","cc":"AI","id":8,"phone":1264,"symbol":"$","capital":"The Valley","currency":"XCD","alpha_3":"AIA"},
    {"name":"Antarctica","cc":"AQ","id":9,"phone":672,"symbol":"$","capital":"Antarctica","currency":"AAD","alpha_3":"ATA"},
    {"name":"Antigua and Barbuda","cc":"AG","id":10,"phone":1268,"symbol":"$","capital":"St. John's","currency":"XCD","alpha_3":"ATG"},
    {"name":"Argentina","cc":"AR","id":11,"phone":54,"symbol":"$","capital":"Buenos Aires","currency":"ARS","alpha_3":"ARG"},
    {"name":"Armenia","cc":"AM","id":12,"phone":374,"symbol":"֏","capital":"Yerevan","currency":"AMD","alpha_3":"ARM"},
    {"name":"Aruba","cc":"AW","id":13,"phone":297,"symbol":"ƒ","capital":"Oranjestad","currency":"AWG","alpha_3":"ABW"},
    {"name":"Australia","cc":"AU","id":14,"phone":61,"symbol":"$","capital":"Canberra","currency":"AUD","alpha_3":"AUS"},
    {"name":"Austria","cc":"AT","id":15,"phone":43,"symbol":"€","capital":"Vienna","currency":"EUR","alpha_3":"AUT"},
    {"name":"Azerbaijan","cc":"AZ","id":16,"phone":994,"symbol":"m","capital":"Baku","currency":"AZN","alpha_3":"AZE"},
    {"name":"Bahamas","cc":"BS","id":17,"phone":1242,"symbol":"B$","capital":"Nassau","currency":"BSD","alpha_3":"BHS"},
    {"name":"Bahrain","cc":"BH","id":18,"phone":973,"symbol":".د.ب","capital":"Manama","currency":"BHD","alpha_3":"BHR"},
    {"name":"Bangladesh","cc":"BD","id":19,"phone":880,"symbol":"৳","capital":"Dhaka","currency":"BDT","alpha_3":"BGD"},
    {"name":"Barbados","cc":"BB","id":20,"phone":1246,"symbol":"Bds$","capital":"Bridgetown","currency":"BBD","alpha_3":"BRB"},
    {"name":"Belarus","cc":"BY","id":21,"phone":375,"symbol":"Br","capital":"Minsk","currency":"BYN","alpha_3":"BLR"},
    {"name":"Belgium","cc":"BE","id":22,"phone":32,"symbol":"€","capital":"Brussels","currency":"EUR","alpha_3":"BEL"},
    {"name":"Belize","cc":"BZ","id":23,"phone":501,"symbol":"$","capital":"Belmopan","currency":"BZD","alpha_3":"BLZ"},
    {"name":"Benin","cc":"BJ","id":24,"phone":229,"symbol":"CFA","capital":"Porto-Novo","currency":"XOF","alpha_3":"BEN"},
    {"name":"Bermuda","cc":"BM","id":25,"phone":1441,"symbol":"$","capital":"Hamilton","currency":"BMD","alpha_3":"BMU"},
    {"name":"Bhutan","cc":"BT","id":26,"phone":975,"symbol":"Nu.","capital":"Thimphu","currency":"BTN","alpha_3":"BTN"},
    {"name":"Bolivia","cc":"BO","id":27,"phone":591,"symbol":"Bs.","capital":"Sucre","currency":"BOB","alpha_3":"BOL"},
    {"name":"Bonaire, Sint Eustatius and Saba","cc":"BQ","id":28,"phone":599,"symbol":"$","capital":"Kralendijk","currency":"USD","alpha_3":"BES"},
    {"name":"Bosnia and Herzegovina","cc":"BA","id":29,"phone":387,"symbol":"KM","capital":"Sarajevo","currency":"BAM","alpha_3":"BIH"},
    {"name":"Botswana","cc":"BW","id":30,"phone":267,"symbol":"P","capital":"Gaborone","currency":"BWP","alpha_3":"BWA"},
    {"name":"Bouvet Island","cc":"BV","id":31,"phone":55,"symbol":"kr","capital":"","currency":"NOK","alpha_3":"BVT"},
    {"name":"Brazil","cc":"BR","id":32,"phone":55,"symbol":"R$","capital":"Brasilia","currency":"BRL","alpha_3":"BRA"},
    {"name":"British Indian Ocean Territory","cc":"IO","id":33,"phone":246,"symbol":"$","capital":"Diego Garcia","currency":"USD","alpha_3":"IOT"},
    {"name":"Brunei Darussalam","cc":"BN","id":34,"phone":673,"symbol":"B$","capital":"Bandar Seri Begawan","currency":"BND","alpha_3":"BRN"},
    {"name":"Bulgaria","cc":"BG","id":35,"phone":359,"symbol":"Лв.","capital":"Sofia","currency":"BGN","alpha_3":"BGR"},
    {"name":"Burkina Faso","cc":"BF","id":36,"phone":226,"symbol":"CFA","capital":"Ouagadougou","currency":"XOF","alpha_3":"BFA"},
    {"name":"Burundi","cc":"BI","id":37,"phone":257,"symbol":"FBu","capital":"Bujumbura","currency":"BIF","alpha_3":"BDI"},
    {"name":"Cambodia","cc":"KH","id":38,"phone":855,"symbol":"KHR","capital":"Phnom Penh","currency":"KHR","alpha_3":"KHM"},
    {"name":"Cameroon","cc":"CM","id":39,"phone":237,"symbol":"FCFA","capital":"Yaounde","currency":"XAF","alpha_3":"CMR"},
    {"name":"Canada","cc":"CA","id":40,"phone":1,"symbol":"$","capital":"Ottawa","currency":"CAD","alpha_3":"CAN"},
    {"name":"Cape Verde","cc":"CV","id":41,"phone":238,"symbol":"$","capital":"Praia","currency":"CVE","alpha_3":"CPV"},
    {"name":"Cayman Islands","cc":"KY","id":42,"phone":1345,"symbol":"$","capital":"George Town","currency":"KYD","alpha_3":"CYM"},
    {"name":"Central African Republic","cc":"CF","id":43,"phone":236,"symbol":"FCFA","capital":"Bangui","currency":"XAF","alpha_3":"CAF"},
    {"name":"Chad","cc":"TD","id":44,"phone":235,"symbol":"FCFA","capital":"N'Djamena","currency":"XAF","alpha_3":"TCD"},
    {"name":"Chile","cc":"CL","id":45,"phone":56,"symbol":"$","capital":"Santiago","currency":"CLP","alpha_3":"CHL"},
    {"name":"China","cc":"CN","id":46,"phone":86,"symbol":"¥","capital":"Beijing","currency":"CNY","alpha_3":"CHN"},
    {"name":"Christmas Island","cc":"CX","id":47,"phone":61,"symbol":"$","capital":"Flying Fish Cove","currency":"AUD","alpha_3":"CXR"},
    {"name":"Cocos (Keeling) Islands","cc":"CC","id":48,"phone":672,"symbol":"$","capital":"West Island","currency":"AUD","alpha_3":"CCK"},
    {"name":"Colombia","cc":"CO","id":49,"phone":57,"symbol":"$","capital":"Bogota","currency":"COP","alpha_3":"COL"},
    {"name":"Comoros","cc":"KM","id":50,"phone":269,"symbol":"CF","capital":"Moroni","currency":"KMF","alpha_3":"COM"},
    {"name":"Congo","cc":"CG","id":51,"phone":242,"symbol":"FC","capital":"Brazzaville","currency":"XAF","alpha_3":"COG"},
    {"name":"Congo, Democratic Republic of the Congo","cc":"CD","id":52,"phone":242,"symbol":"FC","capital":"Kinshasa","currency":"CDF","alpha_3":"COD"},
    {"name":"Cook Islands","cc":"CK","id":53,"phone":682,"symbol":"$","capital":"Avarua","currency":"NZD","alpha_3":"COK"},
    {"name":"Costa Rica","cc":"CR","id":54,"phone":506,"symbol":"₡","capital":"San Jose","currency":"CRC","alpha_3":"CRI"},
    {"name":"Cote D'Ivoire","cc":"CI","id":55,"phone":225,"symbol":"CFA","capital":"Yamoussoukro","currency":"XOF","alpha_3":"CIV"},
    {"name":"Croatia","cc":"HR","id":56,"phone":385,"symbol":"kn","capital":"Zagreb","currency":"HRK","alpha_3":"HRV"},
    {"name":"Cuba","cc":"CU","id":57,"phone":53,"symbol":"$","capital":"Havana","currency":"CUP","alpha_3":"CUB"},
    {"name":"Curacao","cc":"CW","id":58,"phone":599,"symbol":"ƒ","capital":"Willemstad","currency":"ANG","alpha_3":"CUW"},
    {"name":"Cyprus","cc":"CY","id":59,"phone":357,"symbol":"€","capital":"Nicosia","currency":"EUR","alpha_3":"CYP"},
    {"name":"Czech Republic","cc":"CZ","id":60,"phone":420,"symbol":"Kč","capital":"Prague","currency":"CZK","alpha_3":"CZE"},
    {"name":"Denmark","cc":"DK","id":61,"phone":45,"symbol":"Kr.","capital":"Copenhagen","currency":"DKK","alpha_3":"DNK"},
    {"name":"Djibouti","cc":"DJ","id":62,"phone":253,"symbol":"Fdj","capital":"Djibouti","currency":"DJF","alpha_3":"DJI"},
    {"name":"Dominica","cc":"DM","id":63,"phone":1767,"symbol":"$","capital":"Roseau","currency":"XCD","alpha_3":"DMA"},
    {"name":"Dominican Republic","cc":"DO","id":64,"phone":1809,"symbol":"$","capital":"Santo Domingo","currency":"DOP","alpha_3":"DOM"},
    {"name":"Ecuador","cc":"EC","id":65,"phone":593,"symbol":"$","capital":"Quito","currency":"USD","alpha_3":"ECU"},
    {"name":"Egypt","cc":"EG","id":66,"phone":20,"symbol":"ج.م","capital":"Cairo","currency":"EGP","alpha_3":"EGY"},
    {"name":"El Salvador","cc":"SV","id":67,"phone":503,"symbol":"$","capital":"San Salvador","currency":"USD","alpha_3":"SLV"},
    {"name":"Equatorial Guinea","cc":"GQ","id":68,"phone":240,"symbol":"FCFA","capital":"Malabo","currency":"XAF","alpha_3":"GNQ"},
    {"name":"Eritrea","cc":"ER","id":69,"phone":291,"symbol":"Nfk","capital":"Asmara","currency":"ERN","alpha_3":"ERI"},
    {"name":"Estonia","cc":"EE","id":70,"phone":372,"symbol":"€","capital":"Tallinn","currency":"EUR","alpha_3":"EST"},
    {"name":"Ethiopia","cc":"ET","id":71,"phone":251,"symbol":"Nkf","capital":"Addis Ababa","currency":"ETB","alpha_3":"ETH"},
    {"name":"Falkland Islands (Malvinas)","cc":"FK","id":72,"phone":500,"symbol":"£","capital":"Stanley","currency":"FKP","alpha_3":"FLK"},
    {"name":"Faroe Islands","cc":"FO","id":73,"phone":298,"symbol":"Kr.","capital":"Torshavn","currency":"DKK","alpha_3":"FRO"},
    {"name":"Fiji","cc":"FJ","id":74,"phone":679,"symbol":"FJ$","capital":"Suva","currency":"FJD","alpha_3":"FJI"},
    {"name":"Finland","cc":"FI","id":75,"phone":358,"symbol":"€","capital":"Helsinki","currency":"EUR","alpha_3":"FIN"},
    {"name":"France","cc":"FR","id":76,"phone":33,"symbol":"€","capital":"Paris","currency":"EUR","alpha_3":"FRA"},
    {"name":"French Guiana","cc":"GF","id":77,"phone":594,"symbol":"€","capital":"Cayenne","currency":"EUR","alpha_3":"GUF"},
    {"name":"French Polynesia","cc":"PF","id":78,"phone":689,"symbol":"₣","capital":"Papeete","currency":"XPF","alpha_3":"PYF"},
    {"name":"French Southern Territories","cc":"TF","id":79,"phone":262,"symbol":"€","capital":"Port-aux-Francais","currency":"EUR","alpha_3":"ATF"},
    {"name":"Gabon","cc":"GA","id":80,"phone":241,"symbol":"FCFA","capital":"Libreville","currency":"XAF","alpha_3":"GAB"},
    {"name":"Gambia","cc":"GM","id":81,"phone":220,"symbol":"D","capital":"Banjul","currency":"GMD","alpha_3":"GMB"},
    {"name":"Georgia","cc":"GE","id":82,"phone":995,"symbol":"ლ","capital":"Tbilisi","currency":"GEL","alpha_3":"GEO"},
    {"name":"Germany","cc":"DE","id":83,"phone":49,"symbol":"€","capital":"Berlin","currency":"EUR","alpha_3":"DEU"},
    {"name":"Ghana","cc":"GH","id":84,"phone":233,"symbol":"GH₵","capital":"Accra","currency":"GHS","alpha_3":"GHA"},
    {"name":"Gibraltar","cc":"GI","id":85,"phone":350,"symbol":"£","capital":"Gibraltar","currency":"GIP","alpha_3":"GIB"},
    {"name":"Greece","cc":"GR","id":86,"phone":30,"symbol":"€","capital":"Athens","currency":"EUR","alpha_3":"GRC"},
    {"name":"Greenland","cc":"GL","id":87,"phone":299,"symbol":"Kr.","capital":"Nuuk","currency":"DKK","alpha_3":"GRL"},
    {"name":"Grenada","cc":"GD","id":88,"phone":1473,"symbol":"$","capital":"St. George's","currency":"XCD","alpha_3":"GRD"},
    {"name":"Guadeloupe","cc":"GP","id":89,"phone":590,"symbol":"€","capital":"Basse-Terre","currency":"EUR","alpha_3":"GLP"},
    {"name":"Guam","cc":"GU","id":90,"phone":1671,"symbol":"$","capital":"Hagatna","currency":"USD","alpha_3":"GUM"},
    {"name":"Guatemala","cc":"GT","id":91,"phone":502,"symbol":"Q","capital":"Guatemala City","currency":"GTQ","alpha_3":"GTM"},
    {"name":"Guernsey","cc":"GG","id":92,"phone":44,"symbol":"£","capital":"St Peter Port","currency":"GBP","alpha_3":"GGY"},
    {"name":"Guinea","cc":"GN","id":93,"phone":224,"symbol":"FG","capital":"Conakry","currency":"GNF","alpha_3":"GIN"},
    {"name":"Guinea-Bissau","cc":"GW","id":94,"phone":245,"symbol":"CFA","capital":"Bissau","currency":"XOF","alpha_3":"GNB"},
    {"name":"Guyana","cc":"GY","id":95,"phone":592,"symbol":"$","capital":"Georgetown","currency":"GYD","alpha_3":"GUY"},
    {"name":"Haiti","cc":"HT","id":96,"phone":509,"symbol":"G","capital":"Port-au-Prince","currency":"HTG","alpha_3":"HTI"},
    {"name":"Heard Island and Mcdonald Islands","cc":"HM","id":97,"phone":0,"symbol":"$","capital":"","currency":"AUD","alpha_3":"HMD"},
    {"name":"Holy See (Vatican City State)","cc":"VA","id":98,"phone":39,"symbol":"€","capital":"Vatican City","currency":"EUR","alpha_3":"VAT"},
    {"name":"Honduras","cc":"HN","id":99,"phone":504,"symbol":"L","capital":"Tegucigalpa","currency":"HNL","alpha_3":"HND"},
    {"name":"Hong Kong","cc":"HK","id":100,"phone":852,"symbol":"$","capital":"Hong Kong","currency":"HKD","alpha_3":"HKG"},
    {"name":"Hungary","cc":"HU","id":101,"phone":36,"symbol":"Ft","capital":"Budapest","currency":"HUF","alpha_3":"HUN"},
    {"name":"Iceland","cc":"IS","id":102,"phone":354,"symbol":"kr","capital":"Reykjavik","currency":"ISK","alpha_3":"ISL"},
    {"name":"India","cc":"IN","id":103,"phone":91,"symbol":"₹","capital":"New Delhi","currency":"INR","alpha_3":"IND"},
    {"name":"Indonesia","cc":"ID","id":104,"phone":62,"symbol":"Rp","capital":"Jakarta","currency":"IDR","alpha_3":"IDN"},
    {"name":"Iran, Islamic Republic of","cc":"IR","id":105,"phone":98,"symbol":"﷼","capital":"Tehran","currency":"IRR","alpha_3":"IRN"},
    {"name":"Iraq","cc":"IQ","id":106,"phone":964,"symbol":"د.ع","capital":"Baghdad","currency":"IQD","alpha_3":"IRQ"},
    {"name":"Ireland","cc":"IE","id":107,"phone":353,"symbol":"€","capital":"Dublin","currency":"EUR","alpha_3":"IRL"},
    {"name":"Isle of Man","cc":"IM","id":108,"phone":44,"symbol":"£","capital":"Douglas, Isle of Man","currency":"GBP","alpha_3":"IMN"},
    {"name":"Israel","cc":"IL","id":109,"phone":972,"symbol":"₪","capital":"Jerusalem","currency":"ILS","alpha_3":"ISR"},
    {"name":"Italy","cc":"IT","id":110,"phone":39,"symbol":"€","capital":"Rome","currency":"EUR","alpha_3":"ITA"},
    {"name":"Jamaica","cc":"JM","id":111,"phone":1876,"symbol":"J$","capital":"Kingston","currency":"JMD","alpha_3":"JAM"},
    {"name":"Japan","cc":"JP","id":112,"phone":81,"symbol":"¥","capital":"Tokyo","currency":"JPY","alpha_3":"JPN"},
    {"name":"Jersey","cc":"JE","id":113,"phone":44,"symbol":"£","capital":"Saint Helier","currency":"GBP","alpha_3":"JEY"},
    {"name":"Jordan","cc":"JO","id":114,"phone":962,"symbol":"ا.د","capital":"Amman","currency":"JOD","alpha_3":"JOR"},
    {"name":"Kazakhstan","cc":"KZ","id":115,"phone":7,"symbol":"лв","capital":"Astana","currency":"KZT","alpha_3":"KAZ"},
    {"name":"Kenya","cc":"KE","id":116,"phone":254,"symbol":"KSh","capital":"Nairobi","currency":"KES","alpha_3":"KEN"},
    {"name":"Kiribati","cc":"KI","id":117,"phone":686,"symbol":"$","capital":"Tarawa","currency":"AUD","alpha_3":"KIR"},
    {"name":"Korea, Democratic People's Republic of","cc":"KP","id":118,"phone":850,"symbol":"₩","capital":"Pyongyang","currency":"KPW","alpha_3":"PRK"},
    {"name":"Korea, Republic of","cc":"KR","id":119,"phone":82,"symbol":"₩","capital":"Seoul","currency":"KRW","alpha_3":"KOR"},
    {"name":"Kosovo","cc":"XK","id":120,"phone":381,"symbol":"€","capital":"Pristina","currency":"EUR","alpha_3":"XKX"},
    {"name":"Kuwait","cc":"KW","id":121,"phone":965,"symbol":"ك.د","capital":"Kuwait City","currency":"KWD","alpha_3":"KWT"},
    {"name":"Kyrgyzstan","cc":"KG","id":122,"phone":996,"symbol":"лв","capital":"Bishkek","currency":"KGS","alpha_3":"KGZ"},
    {"name":"Lao People's Democratic Republic","cc":"LA","id":123,"phone":856,"symbol":"₭","capital":"Vientiane","currency":"LAK","alpha_3":"LAO"},
    {"name":"Latvia","cc":"LV","id":124,"phone":371,"symbol":"€","capital":"Riga","currency":"EUR","alpha_3":"LVA"},
    {"name":"Lebanon","cc":"LB","id":125,"phone":961,"symbol":"£","capital":"Beirut","currency":"LBP","alpha_3":"LBN"},
    {"name":"Lesotho","cc":"LS","id":126,"phone":266,"symbol":"L","capital":"Maseru","currency":"LSL","alpha_3":"LSO"},
    {"name":"Liberia","cc":"LR","id":127,"phone":231,"symbol":"$","capital":"Monrovia","currency":"LRD","alpha_3":"LBR"},
    {"name":"Libyan Arab Jamahiriya","cc":"LY","id":128,"phone":218,"symbol":"د.ل","capital":"Tripolis","currency":"LYD","alpha_3":"LBY"},
    {"name":"Liechtenstein","cc":"LI","id":129,"phone":423,"symbol":"CHf","capital":"Vaduz","currency":"CHF","alpha_3":"LIE"},
    {"name":"Lithuania","cc":"LT","id":130,"phone":370,"symbol":"€","capital":"Vilnius","currency":"EUR","alpha_3":"LTU"},
    {"name":"Luxembourg","cc":"LU","id":131,"phone":352,"symbol":"€","capital":"Luxembourg","currency":"EUR","alpha_3":"LUX"},
    {"name":"Macao","cc":"MO","id":132,"phone":853,"symbol":"$","capital":"Macao","currency":"MOP","alpha_3":"MAC"},
    {"name":"Macedonia, the Former Yugoslav Republic of","cc":"MK","id":133,"phone":389,"symbol":"ден","capital":"Skopje","currency":"MKD","alpha_3":"MKD"},
    {"name":"Madagascar","cc":"MG","id":134,"phone":261,"symbol":"Ar","capital":"Antananarivo","currency":"MGA","alpha_3":"MDG"},
    {"name":"Malawi","cc":"MW","id":135,"phone":265,"symbol":"MK","capital":"Lilongwe","currency":"MWK","alpha_3":"MWI"},
    {"name":"Malaysia","cc":"MY","id":136,"phone":60,"symbol":"RM","capital":"Kuala Lumpur","currency":"MYR","alpha_3":"MYS"},
    {"name":"Maldives","cc":"MV","id":137,"phone":960,"symbol":"Rf","capital":"Male","currency":"MVR","alpha_3":"MDV"},
    {"name":"Mali","cc":"ML","id":138,"phone":223,"symbol":"CFA","capital":"Bamako","currency":"XOF","alpha_3":"MLI"},
    {"name":"Malta","cc":"MT","id":139,"phone":356,"symbol":"€","capital":"Valletta","currency":"EUR","alpha_3":"MLT"},
    {"name":"Marshall Islands","cc":"MH","id":140,"phone":692,"symbol":"$","capital":"Majuro","currency":"USD","alpha_3":"MHL"},
    {"name":"Martinique","cc":"MQ","id":141,"phone":596,"symbol":"€","capital":"Fort-de-France","currency":"EUR","alpha_3":"MTQ"},
    {"name":"Mauritania","cc":"MR","id":142,"phone":222,"symbol":"MRU","capital":"Nouakchott","currency":"MRO","alpha_3":"MRT"},
    {"name":"Mauritius","cc":"MU","id":143,"phone":230,"symbol":"₨","capital":"Port Louis","currency":"MUR","alpha_3":"MUS"},
    {"name":"Mayotte","cc":"YT","id":144,"phone":269,"symbol":"€","capital":"Mamoudzou","currency":"EUR","alpha_3":"MYT"},
    {"name":"Mexico","cc":"MX","id":145,"phone":52,"symbol":"$","capital":"Mexico City","currency":"MXN","alpha_3":"MEX"},
    {"name":"Micronesia, Federated States of","cc":"FM","id":146,"phone":691,"symbol":"$","capital":"Palikir","currency":"USD","alpha_3":"FSM"},
    {"name":"Moldova, Republic of","cc":"MD","id":147,"phone":373,"symbol":"L","capital":"Chisinau","currency":"MDL","alpha_3":"MDA"},
    {"name":"Monaco","cc":"MC","id":148,"phone":377,"symbol":"€","capital":"Monaco","currency":"EUR","alpha_3":"MCO"},
    {"name":"Mongolia","cc":"MN","id":149,"phone":976,"symbol":"₮","capital":"Ulan Bator","currency":"MNT","alpha_3":"MNG"},
    {"name":"Montenegro","cc":"ME","id":150,"phone":382,"symbol":"€","capital":"Podgorica","currency":"EUR","alpha_3":"MNE"},
    {"name":"Montserrat","cc":"MS","id":151,"phone":1664,"symbol":"$","capital":"Plymouth","currency":"XCD","alpha_3":"MSR"},
    {"name":"Morocco","cc":"MA","id":152,"phone":212,"symbol":"DH","capital":"Rabat","currency":"MAD","alpha_3":"MAR"},
    {"name":"Mozambique","cc":"MZ","id":153,"phone":258,"symbol":"MT","capital":"Maputo","currency":"MZN","alpha_3":"MOZ"},
    {"name":"Myanmar","cc":"MM","id":154,"phone":95,"symbol":"K","capital":"Nay Pyi Taw","currency":"MMK","alpha_3":"MMR"},
    {"name":"Namibia","cc":"NA","id":155,"phone":264,"symbol":"$","capital":"Windhoek","currency":"NAD","alpha_3":"NAM"},
    {"name":"Nauru","cc":"NR","id":156,"phone":674,"symbol":"$","capital":"Yaren","currency":"AUD","alpha_3":"NRU"},
    {"name":"Nepal","cc":"NP","id":157,"phone":977,"symbol":"₨","capital":"Kathmandu","currency":"NPR","alpha_3":"NPL"},
    {"name":"Netherlands","cc":"NL","id":158,"phone":31,"symbol":"€","capital":"Amsterdam","currency":"EUR","alpha_3":"NLD"},
    {"name":"Netherlands Antilles","cc":"AN","id":159,"phone":599,"symbol":"NAf","capital":"Willemstad","currency":"ANG","alpha_3":"ANT"},
    {"name":"New Caledonia","cc":"NC","id":160,"phone":687,"symbol":"₣","capital":"Noumea","currency":"XPF","alpha_3":"NCL"},
    {"name":"New Zealand","cc":"NZ","id":161,"phone":64,"symbol":"$","capital":"Wellington","currency":"NZD","alpha_3":"NZL"},
    {"name":"Nicaragua","cc":"NI","id":162,"phone":505,"symbol":"C$","capital":"Managua","currency":"NIO","alpha_3":"NIC"},
    {"name":"Niger","cc":"NE","id":163,"phone":227,"symbol":"CFA","capital":"Niamey","currency":"XOF","alpha_3":"NER"},
    {"name":"Nigeria","cc":"NG","id":164,"phone":234,"symbol":"₦","capital":"Abuja","currency":"NGN","alpha_3":"NGA"},
    {"name":"Niue","cc":"NU","id":165,"phone":683,"symbol":"$","capital":"Alofi","currency":"NZD","alpha_3":"NIU"},
    {"name":"Norfolk Island","cc":"NF","id":166,"phone":672,"symbol":"$","capital":"Kingston","currency":"AUD","alpha_3":"NFK"},
    {"name":"Northern Mariana Islands","cc":"MP","id":167,"phone":1670,"symbol":"$","capital":"Saipan","currency":"USD","alpha_3":"MNP"},
    {"name":"Norway","cc":"NO","id":168,"phone":47,"symbol":"kr","capital":"Oslo","currency":"NOK","alpha_3":"NOR"},
    {"name":"Oman","cc":"OM","id":169,"phone":968,"symbol":".ع.ر","capital":"Muscat","currency":"OMR","alpha_3":"OMN"},
    {"name":"Pakistan","cc":"PK","id":170,"phone":92,"symbol":"₨","capital":"Islamabad","currency":"PKR","alpha_3":"PAK"},
    {"name":"Palau","cc":"PW","id":171,"phone":680,"symbol":"$","capital":"Melekeok","currency":"USD","alpha_3":"PLW"},
    {"name":"Palestinian Territory, Occupied","cc":"PS","id":172,"phone":970,"symbol":"₪","capital":"East Jerusalem","currency":"ILS","alpha_3":"PSE"},
    {"name":"Panama","cc":"PA","id":173,"phone":507,"symbol":"B/.","capital":"Panama City","currency":"PAB","alpha_3":"PAN"},
    {"name":"Papua New Guinea","cc":"PG","id":174,"phone":675,"symbol":"K","capital":"Port Moresby","currency":"PGK","alpha_3":"PNG"},
    {"name":"Paraguay","cc":"PY","id":175,"phone":595,"symbol":"₲","capital":"Asuncion","currency":"PYG","alpha_3":"PRY"},
    {"name":"Peru","cc":"PE","id":176,"phone":51,"symbol":"S/.","capital":"Lima","currency":"PEN","alpha_3":"PER"},
    {"name":"Philippines","cc":"PH","id":177,"phone":63,"symbol":"₱","capital":"Manila","currency":"PHP","alpha_3":"PHL"},
    {"name":"Pitcairn","cc":"PN","id":178,"phone":64,"symbol":"$","capital":"Adamstown","currency":"NZD","alpha_3":"PCN"},
    {"name":"Poland","cc":"PL","id":179,"phone":48,"symbol":"zł","capital":"Warsaw","currency":"PLN","alpha_3":"POL"},
    {"name":"Portugal","cc":"PT","id":180,"phone":351,"symbol":"€","capital":"Lisbon","currency":"EUR","alpha_3":"PRT"},
    {"name":"Puerto Rico","cc":"PR","id":181,"phone":1787,"symbol":"$","capital":"San Juan","currency":"USD","alpha_3":"PRI"},
    {"name":"Qatar","cc":"QA","id":182,"phone":974,"symbol":"ق.ر","capital":"Doha","currency":"QAR","alpha_3":"QAT"},
    {"name":"Reunion","cc":"RE","id":183,"phone":262,"symbol":"€","capital":"Saint-Denis","currency":"EUR","alpha_3":"REU"},
    {"name":"Romania","cc":"RO","id":184,"phone":40,"symbol":"lei","capital":"Bucharest","currency":"RON","alpha_3":"ROM"},
    {"name":"Russian Federation","cc":"RU","id":185,"phone":70,"symbol":"₽","capital":"Moscow","currency":"RUB","alpha_3":"RUS"},
    {"name":"Rwanda","cc":"RW","id":186,"phone":250,"symbol":"FRw","capital":"Kigali","currency":"RWF","alpha_3":"RWA"},
    {"name":"Saint Barthelemy","cc":"BL","id":187,"phone":590,"symbol":"€","capital":"Gustavia","currency":"EUR","alpha_3":"BLM"},
    {"name":"Saint Helena","cc":"SH","id":188,"phone":290,"symbol":"£","capital":"Jamestown","currency":"SHP","alpha_3":"SHN"},
    {"name":"Saint Kitts and Nevis","cc":"KN","id":189,"phone":1869,"symbol":"$","capital":"Basseterre","currency":"XCD","alpha_3":"KNA"},
    {"name":"Saint Lucia","cc":"LC","id":190,"phone":1758,"symbol":"$","capital":"Castries","currency":"XCD","alpha_3":"LCA"},
    {"name":"Saint Martin","cc":"MF","id":191,"phone":590,"symbol":"€","capital":"Marigot","currency":"EUR","alpha_3":"MAF"},
    {"name":"Saint Pierre and Miquelon","cc":"PM","id":192,"phone":508,"symbol":"€","capital":"Saint-Pierre","currency":"EUR","alpha_3":"SPM"},
    {"name":"Saint Vincent and the Grenadines","cc":"VC","id":193,"phone":1784,"symbol":"$","capital":"Kingstown","currency":"XCD","alpha_3":"VCT"},
    {"name":"Samoa","cc":"WS","id":194,"phone":684,"symbol":"SAT","capital":"Apia","currency":"WST","alpha_3":"WSM"},
    {"name":"San Marino","cc":"SM","id":195,"phone":378,"symbol":"€","capital":"San Marino","currency":"EUR","alpha_3":"SMR"},
    {"name":"Sao Tome and Principe","cc":"ST","id":196,"phone":239,"symbol":"Db","capital":"Sao Tome","currency":"STD","alpha_3":"STP"},
    {"name":"Saudi Arabia","cc":"SA","id":197,"phone":966,"symbol":"﷼","capital":"Riyadh","currency":"SAR","alpha_3":"SAU"},
    {"name":"Senegal","cc":"SN","id":198,"phone":221,"symbol":"CFA","capital":"Dakar","currency":"XOF","alpha_3":"SEN"},
    {"name":"Serbia","cc":"RS","id":199,"phone":381,"symbol":"din","capital":"Belgrade","currency":"RSD","alpha_3":"SRB"},
    {"name":"Serbia and Montenegro","cc":"CS","id":200,"phone":381,"symbol":"din","capital":"Belgrade","currency":"RSD","alpha_3":"SCG"},
    {"name":"Seychelles","cc":"SC","id":201,"phone":248,"symbol":"SRe","capital":"Victoria","currency":"SCR","alpha_3":"SYC"},
    {"name":"Sierra Leone","cc":"SL","id":202,"phone":232,"symbol":"Le","capital":"Freetown","currency":"SLL","alpha_3":"SLE"},
    {"name":"Singapore","cc":"SG","id":203,"phone":65,"symbol":"$","capital":"Singapur","currency":"SGD","alpha_3":"SGP"},
    {"name":"Sint Maarten","cc":"SX","id":204,"phone":1,"symbol":"ƒ","capital":"Philipsburg","currency":"ANG","alpha_3":"SXM"},
    {"name":"Slovakia","cc":"SK","id":205,"phone":421,"symbol":"€","capital":"Bratislava","currency":"EUR","alpha_3":"SVK"},
    {"name":"Slovenia","cc":"SI","id":206,"phone":386,"symbol":"€","capital":"Ljubljana","currency":"EUR","alpha_3":"SVN"},
    {"name":"Solomon Islands","cc":"SB","id":207,"phone":677,"symbol":"Si$","capital":"Honiara","currency":"SBD","alpha_3":"SLB"},
    {"name":"Somalia","cc":"SO","id":208,"phone":252,"symbol":"Sh.so.","capital":"Mogadishu","currency":"SOS","alpha_3":"SOM"},
    {"name":"South Africa","cc":"ZA","id":209,"phone":27,"symbol":"R","capital":"Pretoria","currency":"ZAR","alpha_3":"ZAF"},
    {"name":"South Georgia and the South Sandwich Islands","cc":"GS","id":210,"phone":500,"symbol":"£","capital":"Grytviken","currency":"GBP","alpha_3":"SGS"},
    {"name":"South Sudan","cc":"SS","id":211,"phone":211,"symbol":"£","capital":"Juba","currency":"SSP","alpha_3":"SSD"},
    {"name":"Spain","cc":"ES","id":212,"phone":34,"symbol":"€","capital":"Madrid","currency":"EUR","alpha_3":"ESP"},
    {"name":"Sri Lanka","cc":"LK","id":213,"phone":94,"symbol":"Rs","capital":"Colombo","currency":"LKR","alpha_3":"LKA"},
    {"name":"Sudan","cc":"SD","id":214,"phone":249,"symbol":".س.ج","capital":"Khartoum","currency":"SDG","alpha_3":"SDN"},
    {"name":"Suriname","cc":"SR","id":215,"phone":597,"symbol":"$","capital":"Paramaribo","currency":"SRD","alpha_3":"SUR"},
    {"name":"Svalbard and Jan Mayen","cc":"SJ","id":216,"phone":47,"symbol":"kr","capital":"Longyearbyen","currency":"NOK","alpha_3":"SJM"},
    {"name":"Swaziland","cc":"SZ","id":217,"phone":268,"symbol":"E","capital":"Mbabane","currency":"SZL","alpha_3":"SWZ"},
    {"name":"Sweden","cc":"SE","id":218,"phone":46,"symbol":"kr","capital":"Stockholm","currency":"SEK","alpha_3":"SWE"},
    {"name":"Switzerland","cc":"CH","id":219,"phone":41,"symbol":"CHf","capital":"Berne","currency":"CHF","alpha_3":"CHE"},
    {"name":"Syrian Arab Republic","cc":"SY","id":220,"phone":963,"symbol":"LS","capital":"Damascus","currency":"SYP","alpha_3":"SYR"},
    {"name":"Taiwan, Province of China","cc":"TW","id":221,"phone":886,"symbol":"$","capital":"Taipei","currency":"TWD","alpha_3":"TWN"},
    {"name":"Tajikistan","cc":"TJ","id":222,"phone":992,"symbol":"SM","capital":"Dushanbe","currency":"TJS","alpha_3":"TJK"},
    {"name":"Tanzania, United Republic of","cc":"TZ","id":223,"phone":255,"symbol":"TSh","capital":"Dodoma","currency":"TZS","alpha_3":"TZA"},
    {"name":"Thailand","cc":"TH","id":224,"phone":66,"symbol":"฿","capital":"Bangkok","currency":"THB","alpha_3":"THA"},
    {"name":"Timor-Leste","cc":"TL","id":225,"phone":670,"symbol":"$","capital":"Dili","currency":"USD","alpha_3":"TLS"},
    {"name":"Togo","cc":"TG","id":226,"phone":228,"symbol":"CFA","capital":"Lome","currency":"XOF","alpha_3":"TGO"},
    {"name":"Tokelau","cc":"TK","id":227,"phone":690,"symbol":"$","capital":"","currency":"NZD","alpha_3":"TKL"},
    {"name":"Tonga","cc":"TO","id":228,"phone":676,"symbol":"$","capital":"Nuku'alofa","currency":"TOP","alpha_3":"TON"},
    {"name":"Trinidad and Tobago","cc":"TT","id":229,"phone":1868,"symbol":"$","capital":"Port of Spain","currency":"TTD","alpha_3":"TTO"},
    {"name":"Tunisia","cc":"TN","id":230,"phone":216,"symbol":"ت.د","capital":"Tunis","currency":"TND","alpha_3":"TUN"},
    {"name":"Turkey","cc":"TR","id":231,"phone":90,"symbol":"₺","capital":"Ankara","currency":"TRY","alpha_3":"TUR"},
    {"name":"Turkmenistan","cc":"TM","id":232,"phone":7370,"symbol":"T","capital":"Ashgabat","currency":"TMT","alpha_3":"TKM"},
    {"name":"Turks and Caicos Islands","cc":"TC","id":233,"phone":1649,"symbol":"$","capital":"Cockburn Town","currency":"USD","alpha_3":"TCA"},
    {"name":"Tuvalu","cc":"TV","id":234,"phone":688,"symbol":"$","capital":"Funafuti","currency":"AUD","alpha_3":"TUV"},
    {"name":"Uganda","cc":"UG","id":235,"phone":256,"symbol":"USh","capital":"Kampala","currency":"UGX","alpha_3":"UGA"},
    {"name":"Ukraine","cc":"UA","id":236,"phone":380,"symbol":"₴","capital":"Kiev","currency":"UAH","alpha_3":"UKR"},
    {"name":"United Arab Emirates","cc":"AE","id":237,"phone":971,"symbol":"إ.د","capital":"Abu Dhabi","currency":"AED","alpha_3":"ARE"},
    {"name":"United Kingdom","cc":"GB","id":238,"phone":44,"symbol":"£","capital":"London","currency":"GBP","alpha_3":"GBR"},
    {"name":"United States","cc":"US","id":239,"phone":1,"symbol":"$","capital":"Washington","currency":"USD","alpha_3":"USA"},
    {"name":"United States Minor Outlying Islands","cc":"UM","id":240,"phone":1,"symbol":"$","capital":"","currency":"USD","alpha_3":"UMI"},
    {"name":"Uruguay","cc":"UY","id":241,"phone":598,"symbol":"$","capital":"Montevideo","currency":"UYU","alpha_3":"URY"},
    {"name":"Uzbekistan","cc":"UZ","id":242,"phone":998,"symbol":"лв","capital":"Tashkent","currency":"UZS","alpha_3":"UZB"},
    {"name":"Vanuatu","cc":"VU","id":243,"phone":678,"symbol":"VT","capital":"Port Vila","currency":"VUV","alpha_3":"VUT"},
    {"name":"Venezuela","cc":"VE","id":244,"phone":58,"symbol":"Bs","capital":"Caracas","currency":"VEF","alpha_3":"VEN"},
    {"name":"Viet Nam","cc":"VN","id":245,"phone":84,"symbol":"₫","capital":"Hanoi","currency":"VND","alpha_3":"VNM"},
    {"name":"Virgin Islands, British","cc":"VG","id":246,"phone":1284,"symbol":"$","capital":"Road Town","currency":"USD","alpha_3":"VGB"},
    {"name":"Virgin Islands, U.s.","cc":"VI","id":247,"phone":1340,"symbol":"$","capital":"Charlotte Amalie","currency":"USD","alpha_3":"VIR"},
    {"name":"Wallis and Futuna","cc":"WF","id":248,"phone":681,"symbol":"₣","capital":"Mata Utu","currency":"XPF","alpha_3":"WLF"},
    {"name":"Western Sahara","cc":"EH","id":249,"phone":212,"symbol":"MAD","capital":"El-Aaiun","currency":"MAD","alpha_3":"ESH"},
    {"name":"Yemen","cc":"YE","id":250,"phone":967,"symbol":"﷼","capital":"Sanaa","currency":"YER","alpha_3":"YEM"},
    {"name":"Zambia","cc":"ZM","id":251,"phone":260,"symbol":"ZK","capital":"Lusaka","currency":"ZMW","alpha_3":"ZMB"},
    {"name":"Zimbabwe","cc":"ZW","id":252,"phone":263,"symbol":"$","capital":"Harare","currency":"ZWL","alpha_3":"ZWE"}
] 