// ===========================
// Mind Map Data Structure
// ===========================
const mindMapData = {
    name: "A380 Operations",
    children: [
        {
            name: "Workflow for Flights\n (Operations Manual)",
            children: [
                {
                    name: "Pre-Flight Preparation\n (Duty Day -1 & At Home)",
                    children: [
                        { name: "Review NOTAMs of previous day" },
                        {
                            name: "At Home actions",
                            children: [
                                { name: "Read briefing package, Network Report,/FCI/FCN/ACI/SCB" },
                                { name: "Check Stand and runway in use" },
                            ]
                        },
                        {
                            name: "Reporting Time",
                            children: [
                                { name: "1:25 in Dubai (DXB) before STD\n (OMA 7.6.1)" },
                                { name: "1 hour outstation before STD\n (OMA 7.6.1)" },
                            ]
                        },
                    ]
                },
                {
                    name: "Flight and Duty\n Time Limitations (FTL)",
                    children: [
                        { name: "Check FTL OMA 7.6.2.1 or 7.6.2.2\nand crew composition 4.3.1" },
                        {
                            name: "Flight Duty Period (FDP) Limitations",
                            children: [
                                { name: "Two or More Flight Crew - Acclimatised\n (Table 7.6.2.1)" },
                                { name: "Two or More Flight Crew - Not Acclimatised\n (Table 7.6.2.2)" },
                                {
                                    name: "Extension of FDP",
                                    children: [
                                        { name: "Max 18 hours if bunk available\n (OMA 7.7.1.3)" },
                                        { name: "Max 15 hours if bunk not available\n (OMA 7.7.1.3)" },
                                    ]
                                },
                                { name: "Commander's Discretion: 3 hours max (except emergency)\n (OMA 7.15)" }
                            ]
                        },
                        {
                            name: "Duty Hour Limits (Max Duty Hours) 7.19",
                            children: [
                                { name: "55 hours in any 7 consecutive days" },
                                { name: "90 hours in any 14 consecutive days" },
                                { name: "190 hours in any 28 consecutive days" }
                            ]
                        },
                        {
                            name: "Absolute Flying Limit (7.20)",
                            children: [
                                { name: "100 hours during 28 days" },
                                { name: "900 hours during 12 months" },
                            ]
                        },
                        {
                            name: "Long Range Variation",
                            children: [
                                {
                                    name: "Flight Time Limits (Block Time)",
                                    children: [
                                        { name: "Segment 1: 16 hours or less\n (OMA 7.E.1.2)" },
                                        { name: "Segment 2: More than 16 hours\n (OMA 7.E.1.2)" },
                                    ]
                                },
                                {
                                    name: "Key Rules and Conditions (7.E.2)",
                                    children: [
                                        { name: "Reporting Time: 01:25 DXB/01:15 Outstation" },
                                        { name: "Shall be acclimatized prior to LRV flight or Standby" },
                                        { name: "For S2, 54 hours free of duty including 3 local nights of rest acclimatization" },
                                        { name: "Minimum Rest: As long as preceding duty OR S1: 16 hours, S2: 20 hours" },
                                        { name: "Minimum post-flight rest at home base: 34 hours including 2 local nights if followed by non LRV Pairing,\n 54 hours including 3 local nights if followed by LRV pairing" },
                                        { name: "Home base crossing more than 4 time zones in both directions: 78 hours followed and 4 local nights if LRV,\n 54 hours and 3 local nights if non LRV" }
                                    ]
                                },
                                {
                                    name: "Unforeseen Circumstances (7.E.8)",
                                    children: [
                                        { name: "3 man crew FDP limit 18 hours, 4 man crew 22 hours" },
                                        { name: "Cabin crew complement can be reduced by: 1 departing DXB, 2 departing outstation" },
                                        { name: "Rest period can be reduced to 54 hours and 3 local nights for transition between east-west or west-east except for S2" },
                                        { name: "In case of sickness: 4 man crew can be reduced to 3: Max FDP 18 hours and 15 hours flight time" }
                                    ]
                                },
                            ]
                        },


                    ]
                },
                {
                    name: "Crew Requirements\nand Briefing",
                    children: [
                        { name: "Report Time (Briefing Room): 01.25 DXB/01:15 Outstation (LRV 7.E.2)" },
                        {
                            name: "Minimum Cabin Crew Complement (OMA 4.3.1)",
                            children: [
                                { name: "101-150 seats: 3 CC" },
                                { name: "151-200 seats: 4 CC" },
                                { name: "Additional CC: 1 for each 50 passenger seats or portion of" },
                            ]
                        },
                        {
                            name: "Minimum Required Cabin Crew by Aircraft Type (OMA 4.3.1)",
                            children: [
                                { name: "A380 (3 class): 18 (Note 2)" },
                                { name: "A380 (2 class): 19 (Note 3)" },
                                { name: "B777-300ER: 10 CC" },
                                { name: "B777-200LR: 8 CC" },
                                { name: "A350: 8 CC (Note 4)" },
                                { name: "A319: 2 CC (Note 1)" }
                            ]
                        },
                        {
                            name: "Operation with less than Minimum Cabin Crew Complement (OMA 4.3.2)",
                            children: [
                                { name: "The unattended cabin door shall be considered inoperative for the purpose of determining the maximum number of passengers" },
                                { name: "Carriage of less than regulatory minimum crew shall be authorized by DSVP-FO or his designee" },
                                { name: "A report shall be submitted to UAE GCAA after completion of each such flight" }
                            ]
                        },
                        {
                            name: "Flight Crew Briefing Topics (OMA 8.1.13)",
                            children: [
                                { name: "OFP,Weather, NOTAMS" },
                                { name: "SCB, FCI, FCN, ACI, Network Report" },
                                { name: "Documents, Rest Strategy" }
                            ]
                        },
                        {
                            name: "Cabin Crew Briefing Topics (OMA 8.3.20.2.1 / OME 3.1.2.3)",
                            children: [
                                { name: "Introduction of flight crew, roles and responsibilities" },
                                { name: "Taxi time, Flight time, and cruise altitudes" },
                                { name: "Weather and turbulence" },
                                { name: "Flight deck door policy, Security requirements at destination" }
                            ]
                        },
                        {
                            name: "Cabin Crew Reduction (OMA 7.E.8)",
                            children: [
                                { name: "Reduced by 1 departing DXB" },
                                { name: "Reduced by 2 departing outstation" }
                            ]
                        },
                        {
                            name: "First Officer Operational Restrictions (OMA 5.2.4.4)",
                            children: [
                                { name: "Any reported Runway Condtion Code is less than 5" },
                                { name: "The crosswind component including gusts exceeds 20 knots" },
                                { name: "Any relevant RVR/Visibility for take-off is 500m or less" },
                                { name: "Operating to/from an aerodrome with a company publication requiring Commander only take-off or landing" },
                                { name: "The approach conducted is a CAT I ILS/GLS with autoland, Cat II, or CAT III" },
                                { name: "Shall not taxi if a 180º  turn is required" },
                            ]
                        }
                    ]
                },
                {
                    name: "Ground Operations\n and Fueling (AT GATE)",
                    children: [
                        {
                            name: "Engine Oil (FCOM/Limitations/Engine))",
                            children: [
                                { name: "EA: 10 quarts / 6 + 0.4 quarts per hour" },
                                { name: "RR: 10 quarts / 6 + 0.5 quarts per hour" },
                            ]
                        },
                        {
                            name: "Flight Crew Oxygen (FCOM/Limitations/oxygen))",
                            children: [
                                { name: "2 crew 600 psi" },
                                { name: "3 crew 750 psi" },
                                { name: "4 crew 1000 psi" }
                            ]
                        },
                        {
                            name: "Cabin Oxygen (FCOM/Limitations/oxygen))",
                            children: [
                                { name: "With first class: 1300 psi - DARD 1650 psi" },
                                { name: "Without first class: 1350 psi - DARD 1750 psi" }
                            ]
                        },
                        {
                            name: "Ordering of Fuel (OMA 8.2.1.1)",
                            children: [
                                { name: "Ramp Fuel -5T" },
                                { name: "May update OFP if TOW change of 2 tons or more" }
                            ]
                        },
                        {
                            name: "Refueling with passengers (OMA 8.2.1.3.2)",
                            children: [
                                { name: "Designated Evacuation Doors: 2 main deck (ML1, ML2),\n 1 Upper Deck (UL1 or ML5 if unavailable)" }
                            ]
                        },
                        {
                            name: "Fuel Uplift Check (OMA 8.2.1.4)",
                            children: [
                                { name: "if Actual>Calculated: 5% up to 2 tons" },
                                { name: "if Actual<Calculated: 5% up to 1 ton" }
                            ]
                        },
                        {
                            name: "Fuel Freezing point (OMA 8.2.1.5)",
                            children: [
                                { name: "Uplift >= 90% loaded fuel: Freezing point = fuel uploaded type" },
                                { name: "Uplift < 90% loaded fuel: Freezing point = lowest fuel freezing point (Jet A)" }
                            ]
                        },
                        {
                            name: "Deicing and Antiicing (OMA 8.2.4)",
                            children: [
                                { name: "FCOM/(EK) AWO TAKEOFF CONSIDERATIONS" },
                                { name: "De-icing/anti-icing worksheet (OMC 10.3.1.3)" },
                                { name: "FCTM/NOR/SUPP/ADVERSE WEATHER" },
                                { name: "FCOM/NOR/SUPP/ADVERSE WEATHER/ENGINE ICE SHEDDING ON GROUND" },
                                { name: "Snowfall Intensities as a Function of Prevailing Visibility (OMC 10.3.1.2)" },
                                { name: "Type 4 Fluid Holdover Guidelines (OMC 10.3.10.5)" },
                                { name: "FCOM/NOR/SUPP/ADVERSE WEATHER/COLD WEATHER PROCEDURES" },
                                { name: "FCOM/NOR/SUPP/ADVERSE WEATHER/AIRFRAME DEICING/ANTI-ICING PROCEDURE ON GROUND" },
                                { name: "FCOM/PERF/TAKEOFF/RUNWAY CONTAMINATION/EQUIVALENCES FOR PERFORMANCE" },
                                { name: "Altitude Corrections (OMC 10.4)" },
                                { name: "FCOM/(EK) AWO APPROACH AND LANDING CONSIDERATIONS" }
                            ]
                        },
                    ]
                },
                {
                    name: "Departure and Taxi",
                    children: [
                        { name: "OTP Departure Window: -10/+3 Off Blocks (OMC 1.1.2)" },
                        {
                            name: "Engine Start Fault ECAM (Pushback)",
                            children: [
                                { name: "ANC - Confirm failure - OEB - Actions - status? - checklist,\n reset, deferred procedure - MEL - Failure prior to takeoff" }
                            ]
                        },
                        {
                            name: "Hazardous Weather Decision tree (OMC 10.2.2.3)",
                            children: [
                                { name: "Evaluate weather within 15 nm of airport" },
                                { name: "Do not takeoff/land if Microburst Alert issued" },
                                { name: "Maintain 3 nm horizontal separation if aircraft at or below 1,000 ft AGL" },

                            ]
                        },
                        {
                            name: "Initial Turns (OMA 8.3.20.2.13)",
                            children: [
                                { name: "No turns below 400 ft AGL (unless procedurally required)" },
                                { name: "Max Bank Angle below 200 ft: 15º" },
                                { name: "Max Bank Angle 200-400 ft: 15º (20º with specific approval)" },
                                { name: "Above 400 ft: 30º" },
                                { name: "Procedures shall not require turns below a height equal to one half the wingspan\n or less than 50 ft AGL, whichever is higher" }
                            ]
                        },
                        {
                            name: "Minimum Thrust Reduction and Acceleration Height shall not be less than 1,000 ft AAL(8.3.20.2.15)",
                        },
                        {
                            name: "Cabin Crew Release for Inflight Duties (OMA 8.3.20.2.16)",
                            children: [
                                { name: "Flaps retracted" },
                                { name: "Above 5000 ft AAL" },
                                { name: "Turbulence None or Light" }
                            ]
                        }
                    ]
                },
                {
                    name: "Cruise Flight\nOperations",
                    children: [
                        {
                            name: "In-flight Fuel Management (OMA 8.3.7)",
                            children: [
                                { name: "Regular Checks not exceeding 60 minutes" },
                                { name: "Aim: Arrive at destination with FRF + alternate fuel (OMA 8.3.7.2.1)" },
                                { name: "If landing < FRF + alternate fuel: May continue towards destination if\n safe landing can be achieved at 2 different aerodromes with >= FRF (OMA 8.3.7.2.1)" },
                                { name: "Commit to Land: Safe Landing with Commander as PF >= FRF (OMA 8.3.7.2.2)" },
                                { name: "Minimum Fuel: Change to existing clearance risks landing < FRF (OMA 8.3.7.4)" },
                                { name: "Mayday Fuel: Landing < FRF (OMA 8.3.7.5)" }
                            ]
                        },
                        {
                            name: "Adverse and Potentially Hazardous Atmospheric Conditions (OMA 8.3.8)",
                            children: [
                                {
                                    name: "Thunderstorms",
                                    children: [
                                        { name: "Strong weather radar echoes shall be avoided by at least 10 NM at or below FL200,\n and by at least 20 NM above FL200" },
                                        { name: "When lightning is expected, flight deck lights should be set to high intensity" }
                                    ]
                                }
                            ]
                        },
                        {
                            name: "Pilot Seat Qualification (OMA 8.3.10.1.1)",
                            children: [
                                { name: "Captain: Left hand seat ✔ Right hand seat ✖" },
                                { name: "Captain with Right hand seat qualification: Left hand seat ✔ Right hand seat ✔" },
                                { name: "First Officer: Right hand seat ✔ Left hand seat ✔" },
                                { name: "Note: Flight crew member not occupying his qualified operating seat shall familiarise himself\n with the location of controls that would be required in an emergency" }
                            ]
                        },
                        {
                            name: "Handover Briefing (OMA 8.3.10.1.5)",
                            children: [
                                { name: "Aeroplane position, cleared route, ETA next waypoint, FL" },
                                { name: "ATC/FIR environment, boundaries, clearances and/or restrictions" },
                                { name: "Any threats and mitigations, such as terrain and weather" },
                                { name: "Destination and alternate aerodrome weather" },
                                { name: "Any other information relevant to the safe operation of the aeroplane" },
                                { name: "Aeroplane status" },
                                { name: "Any other relevant information" }
                            ]
                        },
                        { name: "Fuel Freezing (OMC 10.1.9): -65º C or colder for > 90 minutes" }
                    ]
                },
                {
                    name: "Descent, Approach,\nand Landing",
                    children: [
                        {
                            name: "Category I (CAT I) Approach, Approach Procedure with Vertical Guidance (APV),\n Non-precision Approach (without vertical guidance) (OMA 8.3.20.2.23.2)",
                            children: [
                                {
                                    name: " FMS/FMC based approach functions (such as FLS, LNAV/VNAV) the following conditions apply",
                                    children: [
                                        { name: "The approach shall be line selectable from the navigation database" },
                                        { name: "Any modifications at or beyond the FAF shall be in accordance with the respective type specific procedure" },
                                        { name: "Maximum Difference (FMS/FMC vs Charted Value) approach shall be validated as follows: Final approach course: 3º,\n Vertical profile: 0.1º,\n Distance FAF to RW/MAWP: 1 NM,\n Minimum crossing altitudes: 10 ft" },
                                    ]
                                },
                                { name: "10,000 ft AMSL and below: Vmo" }
                            ]
                        },
                        {
                            name: "Maximum Rate of Descent (OMA 8.3.20.2.22)",
                            children: [
                                { name: "Above 5,000 ft AGL: 5,000 fpm" },
                                { name: "5,000-3,000 ft AGL: 3,000 fpm" },
                                { name: "3,000-1000 ft AGL: 2,000 fpm" },
                                { name: "Below 1,000 ft AGL: 1,000 fpm" },
                                { name: "When required by a procedural vertical profile,\n the maximum descent rates may be exceeded if briefed accordingly" }
                            ]
                        },
                        {
                            name: "Commencement and Continuation of Approach (Approach Ban Point)\ (OMA 8.3.20.2.25)",
                            children: [
                                { name: "Commander may commence an instrument approach regardless of the reported visibility or RVR" },
                                {
                                    name: "If the reported visibility or controlling RVR is less than the applicable minimum,\n approach operation shall not be continued:",
                                    children: [
                                        { name: "Past a point at which the aeroplane is 1,000 ft above the aerodrome elevation" },
                                        { name: "Into the final approach segment (FAS) if the DH or MDH is higher than 1,000 ft" }
                                    ]
                                },
                                { name: "If no RVR reported, and reported VIS si less than applicable minuimum,\n but converted meteorological visibility (CMV) in accordance with 8.1.5.3.2 is equal or greater than the applicable minimum,\n the instrument approach can be continued to the DA/H or MDA/H" }
                            ]

                        },
                        {
                            name: "Approach Stabilization Criteria (OMA 8.3.20.2.28)",
                            children: [
                                {
                                    name: "Lateral Path",
                                    children: [
                                        { name: "At the charted FAF/FAP at the charted altitude" },
                                        { name: "Intercepting the glideslope/glidepath at the cleared ATC vectored altitude, if lower" },
                                        { name: "Wings shall be level by 500 feet AAL,\n unless required by charted approach procedure and authorized by CCI or CONOTAM" }
                                    ]
                                },
                                {
                                    name: "At 1,000 ft AAL",
                                    children: [
                                        { name: "Landing gear down and locked" },
                                        { name: "Landing flaps set and in position" },
                                        { name: "speedbrakes retracted" }
                                    ]
                                },
                                {
                                    name: "At 500 ft AAL",
                                    children: [
                                        { name: "Speed VREF to Approach speed + 10 kts" },
                                        { name: "Thrust appropriate to configuration" },
                                        { name: "All checklists completed" }
                                    ]
                                }
                            ]
                        },
                        {
                            name: "Missed Approach acceleration altitude (OMA 8.3.20.2.33.1)",
                            children: [
                                { name: "Published missed approach altitude on approach chart" },
                                { name: "Level off altitude prior to the published missed approach altitude, as practicable" },
                                { name: "State published missed approach acceleration altitude, if lower" }
                            ]
                        },
                        {
                            name: "Subsequent Approaches Following a Missed Approach (OMA 8.3.20.2.33.2)",
                            children: [
                                { name: "If the second approach was unsuccessful and both missed approaches were due to weather conditions,\n the Commander shall divert to the alternate aerodrome unless already committed to destination" },
                                { name: "A third approach may only be flown when one or both missed approaches was non weather related" }
                            ]
                        },
                        {
                            name: "Diversion (OMA 8.3.20.2.34)",
                            children: [
                                { name: "Diversion aerodrome has been discussed and communicated with NCC (ACARS diversion report)" },
                                { name: "Cabin Crew has been advised" },
                                { name: "Passengers have been briefed" }
                            ]
                        },
                        {
                            name: "Diversion to Aerodromes Without Company Support (OMA 8.3.20.2.34.3)",
                            children: [
                                { name: "Security and maintenance of the aeroplane" },
                                { name: "Passengers, such as meals, hotel accommodation" },
                                { name: "Baggage and cargo" },
                                { name: "Flight preparations, such as OFP, ATC flight plan" },
                                { name: "The Commander shall coordinate with NCC, as practicable" }
                            ]
                        },
                        {
                            name: "Layover Briefing (OMA 8.3.20.2.37)",
                            children: [
                                { name: "Wake-up and pick-up time for next duty" },
                                { name: "Threats associated with the layover destination" },
                                { name: "Planned crew changes" }
                            ]
                        }
                    ]
                },
                {
                    name: "Post-Flight\nRequirements",
                    children: [
                        {
                            name: "Rest Period (Greater of) (OMA 7.6.1)",
                            children: [
                                { name: "As long as preceeding duty period" },
                                { name: "12 hours" }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            name: "Crew Health Precautions",
            children: [
                {
                    name: "Anaesthetics 6.1.13",
                    children: [
                        { name: "crew member shall not fly for at least 12 hours after a local anaesthetic" },
                        { name: "shall not fly for 48 hours after a general anaesthetic, sedation, or spinal anaesthetic" }
                    ]
                },
                {
                    name: "Deep Diving 6.1.14",
                    children: [
                        { name: "crew member should not fly within 12 hours of a single day, no-decompression dive" },
                        { name: "18 hours of multiple day or repetitive no-decompressive dives" },
                        { name: "24 hours if the dive required decompression stops" }
                    ]
                },
                {
                    name: "Blood/Bone Marrow Donation 6.1.15",
                    children: [
                        { name: "(by peripheral blood collection) by crew members is not permitted within 48 hours of a flight" },
                        { name: "by aspiration may require longer recovery of up to five days. Should Contact AME" }
                    ]
                },
                {
                    name: "Vaccination and Immunisation 6.1.20",
                    children: [
                        { name: "at least 12 hours prior to a flight" }
                    ]
                },
                {
                    name: "Cosmic Radiation 6.2",
                    children: [
                        { name: "No controls are necessary for an individual crew member whose annual dose can be shown to be less than 1 mSv (6.2.4)" }
                    ]
                }
            ]
        },
        {
            name: "Flight Preparation (OMA 8.1)",
            children: [
                {
                    name: "Rescue and Fire Fighting Services (OMA 8.1.2.4) A380",
                    children: [
                        { name: "Departures and Destination: 10 (1*,2*)" },
                        { name: "Take-off, En-route,and Destination Alternate: 8 (3*)" },
                        { name: "ETOPS, Driftdown and Depressurisation Alternate: 6" },
                        { name: "Note 1: One category below the minimum required RFFS category is authorised" },
                        { name: "Note 2:  The minimum required RFFS categories in case of temporary downgrade can be lowered to 8 (not exceeding 72 hours)" },
                        { name: "Note 3:  The minimum required RFFS categories in case of temporary downgrade can be lowered to 7 (not exceeding 72 hours)" }
                    ]
                },
                {
                    name: "Dispatch - Landing Distance Requirements (OMA 8.1.2.6.4.1) alternate airodrome requirements",
                    children: [
                        {
                            name: "Runway Condition at Destination Aerodromes",
                            children: [
                                {
                                    name: "Dry",
                                    children: [
                                        { name: "Most Favorable Runway in Still Air: Dispatch not allowed" },
                                        { name: "Runway Most Likely to be Assigned, Considering the Probable Wind Speed and Direction:\n One Destination alternate aerodrome required" }
                                    ]
                                },
                                {
                                    name: "Wet",
                                    children: [
                                        { name: "Most Favorable Runway in Still Air: Dispatch not allowed" },
                                        { name: "Runway Most Likely to be Assigned, Considering the Probable Wind Speed and Direction:\n One Destination alternate aerodrome required" }
                                    ]
                                },
                                {
                                    name: "Contaminated",
                                    children: [
                                        { name: "Most Favorable Runway in Still Air: Two Destination alternate aerodrome required" },
                                        { name: "Runway Most Likely to be Assigned, Considering the Probable Wind Speed and Direction:\n One Destination alternate aerodrome required" }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    name: "Take-off Alternate Aerodrome (OMA 8.1.3.1.1)",
                    children: [
                        { name: "A380: Non-ETOPS: 950 NM" },
                        { name: "One Engine inpoerative cruising speed in still air, standard conditions, and maximum take-off weight" }
                    ]
                },
                {
                    name: "Fuel En-route Alternate Aerodrome (OMA 8.1.3.1.3)",
                    children: [
                        { name: "Requirement for planning with 3% Contingency Fuel" },
                        { name: "Shall be located within a circle of radius equal to 20% of total flight plan distance" },
                        { name: "The centre lies on the planned route at a distance from destination of 25% of total flight distance OR\n 20% total flight plan distance plus 50NM whichever is greater" },
                    ]
                },
                {
                    name: "Destination Alternate Aerodrome (OMA 8.1.3.1.6)",
                    children: [
                        { name: "Unless destination aerodrome is isolated, At least  one destination alternate shall be selected" },
                        {
                            name: "Two destination alternate aerodromes shall be selected when:",
                            children: [
                                { name: "The appropriate weather reports and/or forecasts for the destination aerodrome indicate that during a period commencing 1 hour before\n and ending 1 hour after the estimated time of arrival, the weather conditions will be below the applicable planning minima" },
                                { name: "No meteorological information is available" }
                            ]
                        }

                    ]
                },
                {
                    name: "Instrument Approach Classification (OMA 8.1.3.2)",
                    children: [
                        { name: "Type A instrument approach operation means an instrument approach operation with an MDH or a DH at or above 250 ft" },
                        {
                            name: "Type B instrument approach operation means an operation with an MDH or a DH below 250 ft",
                            children: [
                                { name: "CAT I: DH not lower than 200 ft and RVR not less than 550 m or visibility not less than 800 m" },
                                { name: "CAT II: DH not lower than 100 ft up to 200 ft and RVRnot less than 300 m" },
                                { name: "CAT III: DH lower than 100 ft or no DH and RVR less than 300 m" }
                            ]
                        }
                    ]
                },
                {
                    name: "Required Visual Reference at MDA/H or DA (OMA 8.1.5.3.1)",
                    children: [
                        {
                            name: "Instrument approach operations Type A, Cat I instrument approach Type B, APV, Non-precision: At least one of the following",
                            children: [
                                { name: "Elements of the approach lights system" },
                                { name: "The threshold" },
                                { name: "The threshold markings" },
                                { name: "The threshold lights" },
                                { name: "The thrshold identification lights" },
                                { name: "The visual glide path indicator" },
                                { name: "The touchdown zone or touchdown zone markings" },
                                { name: "The touchdown zone lights" },
                                { name: "Runway edge lights" }
                            ]
                        },
                        {
                            name: "CAT II: at least 3 consecutive lights",
                            children: [
                                { name: "Centre line of the approach lights" },
                                { name: "Touchdown zone lights" },
                                { name: "Runway edge lights" },
                                { name: "Runway centre line lights" },
                                { name: "Combination of these is attained and can be maintained" },
                                { name: "A lateral element of the ground pattern" }
                            ]
                        },
                        {
                            name: "CAT III fail-passive flight control system (WITH DH): at least 3 consecutive lights",
                            children: [
                                { name: "Centre line of the approach lights" },
                                { name: "Touchdown zone lights" },
                                { name: "Runway centre line lights" },
                                { name: "Runway edge lights" },
                                { name: "Combination of these is attained and can be maintained" }
                            ]
                        },
                        {
                            name: "CAT II fail-operational flight control system",
                            children: [
                                { name: "at least one centre line light is attained and can be maintained" }
                            ]
                        },
                        {
                            name: "CAT III NO DH",
                            children: [
                                { name: "No requirement for visual contact with the runway prior to touchdown" }
                            ]
                        }
                    ]
                },
                {
                    name: "Fuel Tankering (OMA 8.1.7.6)",
                    children: [
                        { name: "Max Landing Weight minus 1%" },
                        { name: "Regulated Landing Weight minus 1%" },
                        { name: "Commander may deviate and uplift up to MLW or RLW whichever is less" }
                    ]
                },
                {
                    name: "Fuel Tankering with Cold Soaked Fuel",
                    children: [
                        { name: "Less than 2 hours flight time: No restriction" },
                        { name: "Between 2 and 4 hours flight time: 25 tons Forecasted OAT at destination less than 15°C and no precipitation\n or condensation or less than 20°C with precipitation or condensation excluding mist and haze" },
                        { name: "More than 4 hours flight time: 25 tons Forecasted OAT at destination less than 20°C" },
                        {
                            name: "Restrictions do not apply if:",
                            children: [
                                { name: "While in flight" },
                                { name: "Fuel tankering for operational reasons" },
                                { name: "Scheduled ground time at destination exceeds 12 hours" }
                            ]
                        }
                    ]
                },
                {
                    name: "Standard Masses (including hand luggage)(OMA 8.1.8.2)",
                    children: [
                        { name: "Flight Crew: 85kg" },
                        { name: "Cabin Crew: 75kg" },
                        { name: "Male passenger: 88kg" },
                        { name: "Female Passenger: 70kg" },
                        { name: "Children: 35kg" },
                        { name: "Infant: 0kg" }
                    ]
                },
                {
                    name: "Last Minute Change (OMA 8.1.8.6.2)",
                    children: [
                        { name: "The LMC does not exceed the calculated underload or any mass limitation of the aeroplane" },
                        { name: "The load limitations of compartments and loading positions are not exceeded" },
                        { name: "The center of gravity stays within the allowed limits" },
                        { name: "Individual or total LMC shall be 500 kg or less" },
                        { name: "Maximum structural and performance limited weights not exceeded" },
                        { name: "Loading limitations not exceeded" }
                    ]
                },
                {
                    name: "Stations without an Authorised Engineer (OMA 8.1.11.2.2)",
                    children: [
                        { name: "Perform pre-flight inspection" },
                        { name: "Perform/oversee refueling" },
                        { name: "Add defects to the ADD section of the Aircraft Technical Log in accordance with the conditions of the Minimum Equipment List" }
                    ]
                },
                {
                    name: "List of Documents, Forms and Additional Information to be Carried (OMA 8.1.12)",
                    children: [
                        { name: "Certificate of Registration (Original)*" },
                        { name: "Certificate of Airworthiness (Original)*" },
                        { name: "Noise Certificate (Copy)*" },
                        { name: "Air Operator Certificate (AOC) (Certified true copy)*" },
                        { name: "Operations Specification relevant to the aeroplane type issued in conjunction with the AOC (Copy)*" },
                        { name: "Aircraft Radio Station License (Original)*" },
                        { name: "Insurance Certificate(s), which cover the aeroplane, its crew, passengers and third party liability clauses (Copy)*" },
                        { name: "Airworthiness Review Certificates (ARC), if applicable (Original)*" },
                        { name: "General Declaration (Original)" },
                        { name: "Other documents needed for the intended operation" },
                        { name: "Note 1: For any missing document, advise NCC as soon as practicable. In case of loss or theft of the documents above,\n operation is permitted to continue to a destination where replacements documents can be provided" }
                    ]
                }
            ]
        },
        {
            name: "Flight Procedures",
            children: [
                {
                    name: "Use of Seat Belts for Crew and Passengers (OMA 8.3.11)",
                    children: [
                        {
                            name: "Crew seatbelts and shoulder harness(OMA 8.3.11.1)",
                            children: [
                                { name: "Taxiing" },
                                { name: "Take- off and landing" },
                                { name: "Whenever deemed necessary by the Commander" }]
                        },
                        {
                            name: "Use of fasten Seat Belt Sign(OMA 8.3.11.3)",
                            children: [
                                {
                                    name: "Taxiing, take- off, and for all phases below 10,000 ft AAL"
                                },
                                { name: "At or below 25,000 ft AAL during descent" },
                                { name: "Whenever deemed necessary by Commander" }]
                        }]
                },
                {
                    name: "Incapacitation of Crew Members(OMA 8.3.14)",
                    children: [
                        {
                            name: "Incapacitation suspected when:",
                            children: [
                                { name: "Two verbal communications when above 1000 ft AGL" },
                                { name: "One verbal communication when below 1000 ft AGL" },
                                { name: "Any verbal communication associated with significant deviation from the intended flight path" }]
                        },
                        {
                            name: "When incapacitation is obvious:",
                            children: [
                                { name: "Ensure a safe condition of flight" },
                                { name: "Take over the controls immediately" },
                                { name: "Ensure autopilot is engaged" },
                                { name: "Transmit an urgency or distress message" },
                                { name: "Call a cabin crew member for assistance" },
                                { name: "Cabin crew to remove the incapacitated pilot from the controls" },
                                { name: "Evaluate all operational aspects of the flight" },
                                { name: "Determine the suitability of en- route alternate aerodromes for a diversion" }
                            ]
                        },
                        {
                            name: "Additional considerations",
                            children: [
                                { name: "Medical assistance in-flight and after landing should be arranged" },
                                { name: "Allow enough time for preparations to land" },
                                { name: "Request radar vectors for long final approach" },
                                { name: "Perform required normal checklists as early as practicable" },
                                { name: "Arrange a suitable parking bay.Tow if parking guidance calibrated for left hand seat" }]
                        }
                    ]
                },
                {
                    name: "Policy on the use of Autopilot and Autothrottle(OMA 8.3.18)",
                    children: [
                        { name: "Flight Directors: shall always be on unless unserviceable or off according to procedure" },
                        { name: "Autopilot: At or above 20,000 ft MSL shall always be engaged" },
                        { name: "Autothrust: Shall remain engaged" },
                        { name: "FCU/ MCP and FMS / FMC: flight path monitored, mode changes announced and cross - checked,\n intervention to achieve desired flight path, in high workload times FMS modifications reduced to essential" }]
                },
                {
                    name: "Sterile flight deck(OMA 8.3.20.1.1)",
                    children: [
                        { name: "Departure: final door closure till 10,000 ft AAL" },
                        { name: "Arrival: 25,000 ft AAL till first door opened" }]
                },
                {
                    name: "No Contact Period(OMA 8.3.20.1.1.2)",
                    children: [
                        { name: "Departure: start of take- off roll till landing gear retracts" },
                        { name: "Arrival: Extension of landing gear till vacating the runway" }]
                },
                {
                    name: "Headsets/Boom Microphones (OMA 8.3.20.1.9)",
                    children: [
                        { name: "When receiving the ATC departure clearance via voice communication" },
                        { name: "When on the ground with engines running" },
                        { name: "When in-flight below transition altitude or 10,000 ft AAL, whichever is higher" },
                        { name: "When operating more than one radio at the same time" },
                        { name: "When only one pilot occupies an operating seat" },
                        { name: "When one pilot conducts controlled rest on the flight deck" },
                        { name: "Whenever deemed necessary by the Commander" }
                    ]
                },
                {
                    name: "Taxi (OMA 8.3.20.1.7)",
                    children: [
                        { name: "Surfaces not reported as slippery: 30 kt" },
                        { name: "Slippery or contaminated surface: 10 kt" },
                        { name: "Low Visibility Operations: 10 kt" }
                    ]
                },
                {
                    name: "Speed Limit (OMA 8.3.20.1.8)",
                    children: [
                        {
                            name: "Above 5000 ft AAL:",
                            children: [
                                { name: "Departure or arrival procedure requires higher speed" },
                                { name: "Speed restriction waived by ATC" }
                            ]
                        },
                        { name: "below 10,000 ft AAL shall not exceed 250 kt or minimum clean speed, whichever is higher" }
                    ]
                },
                {
                    name: "Starting Engines (OMA 8.3.20.2.4): Shall be coordinated with responsible ground personnel \nexcept if performing 'engine start after push and hold' or 'Reduced Engine Taxi'"
                },
                {
                    name: "Orbits/360º Turns (OMA 8.3.20.2.27)",
                    children: [
                        { name: "At or above 1,500 ft AAL or AGL, whichever is higher" },
                        { name: " Autopilot engaged" },
                        { name: "Compliance with the approach stabilisation criteria ensured" },
                        { name: "Unless under positive radar control, orbits/360º turns are only permitted during daylight VMC" }
                    ]
                },
                {
                    name: "Malfunctions and Emergencies (OMA 8.3.20.3.3)",
                    children: [
                        { name: "The Commander should conduct the landing when in, or following,\n an abnormal/non normal situation where the aeroplanes performance is affected" },
                        { name: "In-flight, crew members shall not enter an avionics compartment, except in an emergency" }
                    ]
                },
                {
                    name: "Non-Standard Engine Out Procedure (Turning)\n (OMA 8.3.20.3.6.2)",
                    children: [
                        { name: "At turning point, turn as required by the procedure with a bank angle of 15 degrees\n (or as required by the Non-Standard EOP)" },
                        {
                            name: "Initiate acceleration when:",
                            children: [
                                { name: "The aeroplane is established on the final heading, track, or course of the Non-Standard EOP and at or above the minimum acceleration height" },
                                { name: "At or above the applicable MSA" },
                                { name: "The aeroplane meets the specific requirements described in the applicable Non-Standard EOP" }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            name: "Temporary Documentary Unit TDU ",
            children: [
                {
                    name: "Descent Preparation",
                    children: [
                        { name: "Probability of FMC reset during the approach phase due to an incorrect or missing OAT value in a SEC F-PLN" },
                        { name: "If SEC F-PLN no longer required: SEC 1(2)(3)...DELETE" },
                        { name: "If SEC F-PLN required: SEC 1(2)(3)...Prepare, SEC 1(2)(3)...PERF/APPR/OAT Insert/Check accuracy" },
                        { name: "To avoid FMS reset(s) during descent and approach, the flight crew should enter an OAT value in accordance with the expected temperature at the destination airport of the SEC F-PLN" }
                    ]
                },
                {
                    name: "BTV",
                    children: [
                        { name: "Following in-service BTV disconnection, the caution prohibits the use of BTV on some specific approaches." },
                        { name: "The use of BTV is prohibited on the runways 13 R or 13 L associated with the approach VOR or GPS 13R or 13 L 'CANARSIE' at JFK airport if the last coded point of the approach is above 700ft RA" }
                    ]
                },
                {
                    name: "Runway Conditions",
                    children: [
                        { name: "Introduce a second takeoff performance computation with the lower depth of contaminant, when the reported depth of contaminant is between two values in the list of runway conditions" }
                    ]
                }
            ]
        },
        {
            name: "Temporary Abnormal Behaviours TABS",
            children: [
                {
                    name: "FMS Reset due to OFFSET that Ends in a F-PLN Discontinuity",
                    children: [
                        { name: "The insertion of an offset that ends in a F-PLN leg with a discontinuity can result in an erroneous computation of the FMS. \nThis may cause multiple consecutive FMS resets" },
                        { name: "When the flight crew inserts an offset in a F-PLN that contains a discontinuity, \nthey should ensure that the offset ends before the leg that contains the discontinuity" }
                    ]
                },
                {
                    name: "Involuntary FCU Switch OFF",
                    children: [
                        { name: "Inadvertently switch off the FCU then immediately switch it back to ON, the FCU erroneously detects a power supply failure, \nand triggers AUTO FLT AFS CTL PNL FAULT ECAM" },
                        { name: "It is recommended to wait for at least 3 s before switching FCU back to ON, as recommended for a system reset" },
                        { name: "In case of AUTO FLT AFS CTL PNL FAULT ECAM alert is displayed, the MFD FCU BACKUP function should be used in flight by the crew to control autoflight functions" }
                    ]
                },
                {
                    name: "Loss of OFFSET Function",
                    children: [
                        { name: "When the flight crew manually cancels an offset, and the end of the offset return path coincides with a waypoint of the original flight path,\nthe Lateral Guidance function does not create a pseudo waypoint,\n then the offset function is lost and no longer available for the remainder of the flight." },
                        { name: "Prevention: Before the flight crew manually cancels an offset, they should ensure that the offset return path does not coincide with an existing waypoint of the original flight path" },
                        {
                            name: "Recovery: Clear FMS PAGE NOT AVAIL",
                            children: [
                                { name: "Select another MFD page, and then come back to the FMS 1(2) page" },
                                { name: "Set the FMS selector to BOTH ON 1(2) to recover the FMS 2(1), and then set it back to NORM" },
                                { name: "Note: An FMS reset also restores the access to the FMS pages but does not enable the recovery of the OFFSET function" }
                            ]
                        },
                        { name: "Recovery of Offset Function: flight crew should create a new flight plan, or swap the ACTIVE/F-PLN with a SEC/F-PLN\nThis action works only if the flight crew copied the secondary flight plan before the issue occurred" }
                    ]
                },
                {
                    name: "Spurious ABOVE MAX FL Indication for STEP ALTs",
                    children: [
                        { name: "The FMS uses the current aircraft GW, instead of the estimated weight at the planned waypoints for the step altitudes" },
                        { name: "The flight crew can disregard the ABOVE MAX FL indication(s) and STEP ABOVE MAX FL message in the FMS F-PLN/VERT REV page, provided that they confirm the capability of the aircraft to climb to the affected step altitude(s) at the planned waypoint" }
                    ]
                },
                {
                    name: "Undue Display of Derated Climb Levels 04 and 05",
                    children: [
                        { name: "Effects: Erroneous FMS predictions (T/C, T/D), OPT FL not available\nNo transition to CRZ phase at T/C\nDuring climb, thrust guidance is MAX CLB and FMA displays THR CLB" },
                        { name: "The flight crew must not use the derated climb level DERATE 04 or DERATE 05 in the THRUST list of the PERF/CLB panel" }
                    ]
                },
                {
                    name: "Spurious T.O SPEED TOO LOW CHECK TOW & T.O DATA Displayed on FMS\n Message Area or T.O SPEEDS TOO LOW ECAM Alert",
                    children: [
                        { name: "If the FMS detects an invalid ADIRS altitude/SAT parameter after entering the takeoff speeds in the T.O panel of the PERF page\nT.O SPEED TOO LOW CHECK TOW & T.O DATA may appear on the FMS message area\nECAM T.O SPEEDS TOO LOW may be triggered when the flight crew presses the T.O CONFIG pb of the ECP" },
                        {
                            name: "Operational Recommendations",
                            children: [
                                { name: "Recompute the takeoff performance data" },
                                { name: "Crosscheck and insert the updated takeoff data results in the FMS" },
                                { name: "If the takeoff data is unchanged from previous calculation, reinsert V1, VR, V2" },
                                { name: "If the takeoff is performed with FLEX and message still persists, change the Takeoff Thrust in the FMS to TOGA and back to FLEX, then insert the flex temperature" },
                                { name: "Perform OIS XCHECK WITH AVNCS if available or follow the (EK) UNAVAILABILITY OF X-CHECK WITH AVIONICS FUNCTION " },
                                { name: "WARNING: DO NOT TAKE OFF IF ALERT STILL DISPLAYED" },
                                { name: "AFTER THE FLIGHT: Any occurrence shall be reported via an ASR" }
                            ]
                        }
                    ]
                },
                {
                    name: "Loss of RMP Following VHF DATALINK PROVIDER Page Selection",
                    children: [
                        { name: "If the flight crew selects the VHF DATALINK PROVIDER page on the DATALINK ROUTER page of the RMP 1(2)(3), the associated RMP may be lost" },
                        { name: "To recover the RMP 1(2)(3), the flight crew sets the BRT/OFF knob to OFF then BRT\nThe automatic mode of the VHF datalink is still available. However, the manual mode is lost" }
                    ]
                },
                {
                    name: "Erroneous Activation of the CABIN PRESSURE WARNING Lights without Real Residual Differential Pressure",
                    children: [
                        { name: "Sensors used to detect residual differential pressure for the CABIN PRESSURE WARNING lights have a defect and may temporarily send an erroneous message to the Doors and Slides Management System (DSMS)" },
                        {
                            name: "Operational Recommendations: ",
                            children: [
                                { name: "Before cabin(cargo) door opening, if the CABIN PRESSURE WARNING lights flash" },
                                { name: "There is no CAB PRESS EXCESS RESIDUAL DIFF PRESS alert triggered" },
                                { name: "On the CAB PRESS SD page:\nThe DELTA P indication is 0 PSI\nAll outflow valves are indicated fully open" },
                                { name: "if the CABIN PRESSURE WARNING lights keep flashing after door opening, a technical logbook entry is necessary, as a DSMS failure may be the cause of the issue" }
                            ]
                        }
                    ]
                },
                {
                    name: "Discrepancy Between Barometric Value Selected on EFIS CP and Displayed on PFD",
                    children: [
                        { name: "there may be a discrepancy of 0.01 inHg between the value selected on the EFIS CPs and the values displayed on the PFDs" },
                        { name: "No operational impact on altitude calculations" }
                    ]
                },
                {
                    name: "Communication Buttons Not Available on the Mailbox",
                    children: [
                        { name: "If the RECALL button is available: The flight crew clicks on the RECALL button, and then closes the recalled message" },
                        { name: "If there is another message in the mailbox: The flight crew displays the other message using the Next/Previous Message Buttons" }
                    ]
                },
                {
                    name: "Weather Radar Performance Above 80 NM",
                    children: [
                        { name: "The flight crew should take into account all weather information displayed on the ND" },
                        { name: "The flight crew should pay attention to the possibility of a late weather display" }
                    ]
                }
            ]
        }
    ]
};

// ===========================
// D3.js Mind Map Implementation
// ===========================
let svg, g, tree, root, zoomBehavior;
let currentZoom = 1;

// Initialize the mind map
function initMindMap() {
    const container = document.getElementById('mindmap-container');
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Create SVG
    svg = d3.select('#mindmap-container')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    // Create zoom behavior
    zoomBehavior = d3.zoom()
        .scaleExtent([0.1, 3])
        .on('zoom', (event) => {
            g.attr('transform', event.transform);
            currentZoom = event.transform.k;
        });

    svg.call(zoomBehavior);

    // Create main group
    g = svg.append('g')
        .attr('transform', `translate(100, ${height / 2})`);

    // Create tree layout
    tree = d3.tree()
        .size([height * 2.5, width - 400])
        .separation((a, b) => (a.parent === b.parent ? 2 : 2.5));

    // Create hierarchy
    root = d3.hierarchy(mindMapData);
    root.x0 = height / 2;
    root.y0 = 0;

    // Collapse all children initially except level 1
    root.children.forEach(collapse);

    // Initial render
    update(root);

    // Center the root node
    centerNode(root);
}

// Update function
function update(source) {
    const duration = 750;
    const treeData = tree(root);
    const nodes = treeData.descendants();
    const links = treeData.links();

    // Normalize for fixed-depth
    nodes.forEach(d => {
        d.y = d.depth * 600;  // Increased horizontal spacing between depth levels
    });

    // ========== Nodes ==========
    const node = g.selectAll('g.node')
        .data(nodes, d => d.id || (d.id = ++i));

    // Enter new nodes
    const nodeEnter = node.enter().append('g')
        .attr('class', d => `node node-level-${d.depth}${d.children || d._children ? ' has-children' : ''}${d._children ? ' collapsed' : ''}`)
        .attr('transform', d => `translate(${source.y0},${source.x0})`)
        .on('click', click);

    // Add circles
    nodeEnter.append('circle')
        .attr('r', 1e-6)
        .style('fill', d => d._children ? 'lightsteelblue' : '#fff');

    // Add text (supports \n via tspan elements)
    nodeEnter.append('text')
        .attr('x', d => d.children || d._children ? -13 : 13)
        .attr('text-anchor', d => d.children || d._children ? 'end' : 'start')
        .style('fill-opacity', 1e-6)
        .style('fill', '#f1f5f9')
        .each(function (d) {
            const lines = d.data.name.split('\n').map(l => l.trim()).filter(Boolean);
            const lineHeight = 32;
            const startDy = -((lines.length - 1) * lineHeight) / 2;
            lines.forEach((line, i) => {
                d3.select(this).append('tspan')
                    .attr('x', d.children || d._children ? -13 : 13)
                    .attr('dy', i === 0 ? `${startDy}px` : `${lineHeight}px`)
                    .text(line);
            });
        });

    // Update existing nodes
    const nodeUpdate = nodeEnter.merge(node);

    nodeUpdate.transition()
        .duration(duration)
        .attr('transform', d => `translate(${d.y},${d.x})`);

    nodeUpdate.select('circle')
        .attr('r', d => d.depth === 0 ? 12 : 8)
        .style('fill', d => {
            if (d._children) return 'rgba(139, 92, 246, 0.7)';
            if (d.depth === 0) return '#8B5CF6';
            if (d.depth === 1) return '#3B82F6';
            if (d.depth === 2) return '#10B981';
            return '#F59E0B';
        })
        .attr('cursor', 'pointer');

    nodeUpdate.select('text')
        .style('fill-opacity', 1)
        .style('font-weight', d => d.depth === 0 ? 700 : d.depth === 1 ? 600 : 500)
        .style('font-size', d => d.depth === 0 ? '30px' : '26px');

    // Remove exiting nodes
    const nodeExit = node.exit().transition()
        .duration(duration)
        .attr('transform', d => `translate(${source.y},${source.x})`)
        .remove();

    nodeExit.select('circle')
        .attr('r', 1e-6);

    nodeExit.select('text')
        .style('fill-opacity', 1e-6);

    // ========== Links ==========
    const link = g.selectAll('path.link')
        .data(links, d => d.target.id);

    // Enter new links
    const linkEnter = link.enter().insert('path', 'g')
        .attr('class', 'link')
        .attr('d', d => {
            const o = { x: source.x0, y: source.y0 };
            return diagonal(o, o);
        });

    // Update existing links
    const linkUpdate = linkEnter.merge(link);

    linkUpdate.transition()
        .duration(duration)
        .attr('d', d => diagonal(d.source, d.target));

    // Remove exiting links
    link.exit().transition()
        .duration(duration)
        .attr('d', d => {
            const o = { x: source.x, y: source.y };
            return diagonal(o, o);
        })
        .remove();

    // Store old positions
    nodes.forEach(d => {
        d.x0 = d.x;
        d.y0 = d.y;
    });
}

// Create diagonal path
function diagonal(s, d) {
    return `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`;
}

// Click handler
function click(event, d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
    } else {
        d.children = d._children;
        d._children = null;
    }
    update(d);
}

// Collapse function
function collapse(d) {
    if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
    }
}

// Expand all nodes
function expandAll(d) {
    if (d._children) {
        d.children = d._children;
        d._children = null;
    }
    if (d.children) {
        d.children.forEach(expandAll);
    }
}

// Collapse all nodes
function collapseAll(d) {
    if (d.children) {
        d._children = d.children;
        d._children.forEach(collapseAll);
        d.children = null;
    }
}

// Center node
function centerNode(source) {
    const scale = currentZoom;
    const x = -source.y0 * scale + window.innerWidth / 4;
    const y = -source.x0 * scale + window.innerHeight / 2;

    svg.transition()
        .duration(750)
        .call(
            zoomBehavior.transform,
            d3.zoomIdentity.translate(x, y).scale(scale)
        );
}

// Control handlers
document.getElementById('zoom-in').addEventListener('click', () => {
    svg.transition().call(zoomBehavior.scaleBy, 1.3);
});

document.getElementById('zoom-out').addEventListener('click', () => {
    svg.transition().call(zoomBehavior.scaleBy, 0.7);
});

document.getElementById('reset-view').addEventListener('click', () => {
    currentZoom = 1;
    centerNode(root);
});

document.getElementById('expand-all').addEventListener('click', () => {
    expandAll(root);
    update(root);
});

document.getElementById('collapse-all').addEventListener('click', () => {
    root.children.forEach(collapse);
    update(root);
});

// Node ID counter
let i = 0;

// Initialize on load
window.addEventListener('DOMContentLoaded', initMindMap);

// Handle window resize
window.addEventListener('resize', () => {
    const container = document.getElementById('mindmap-container');
    const width = container.clientWidth;
    const height = container.clientHeight;

    svg.attr('width', width).attr('height', height);
    tree.size([height - 200, width - 400]);
    update(root);
});
