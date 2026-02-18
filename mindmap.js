// ===========================
// Mind Map Data Structure
// ===========================
const mindMapData = {
    name: "Workflow for Flights\n(Operations Manual)",
    children: [
        {
            name: "Pre-Flight Preparation\n(Duty Day -1 & At Home)",
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
                        { name: "1:25 in Dubai (DXB) before STD (OMA 7.6.1)" },
                        { name: "1 hour outstation before STD (OMA 7.6.1)" },
                    ]
                },
            ]
        },
        {
            name: "Flight and Duty\nTime Limitations (FTL)",
            children: [
                { name: "Check FTL OMA 7.6.2.1 or 7.6.2.2\nand crew composition 4.3.1" },
                {
                    name: "Flight Time Limits (Block Time)",
                    children: [
                        { name: "Segment 1: 16 hours or less (OMA 7.E.1.2)" },
                        { name: "Segment 2: More than 16 hours (OMA 7.E.1.2)" },
                    ]
                },
                {
                    name: "Flight Duty Period (FDP) Limitations",
                    children: [
                        { name: "Two or More Flight Crew - Acclimatised (Table 7.6.2.1)" },
                        { name: "Two or More Flight Crew - Not Acclimatised (Table 7.6.2.2)" },
                        {
                            name: "Extension of FDP",
                            children: [
                                { name: "Max 18 hours if bunk available (OMA 7.7.1.3)" },
                                { name: "Max 15 hours if bunk not available (OMA 7.7.1.3)" },
                            ]
                        },
                        { name: "Commander's Discretion: 3 hours max (except emergency) (OMA 7.15)" }
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
                }
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
                    name: "Minimum Required Cabin Crew by Aircraft Type",
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
                    name: "Flight Crew Briefing Topics (OMA 8.1.13)",
                    children: [
                        { name: "OFP,Weather, NOTAMS" },
                        { name: "SCB, FCI, FCN, ACI, Network Report" },
                        { name: "Documents, Rest Strategy" }
                    ]
                },
                {
                    name: "Cabin Crew Briefing Topics (OME 3.1.2.3)",
                    children: [
                        { name: "Introduction of flight crew and chain of command" },
                        { name: "Taxi time, Weather and turbulence" },
                        { name: "Flight deck door policy, Security requirements at destination" }
                    ]
                },
                {
                    name: "Cabin Crew Reduction (OMA 7.E.8)",
                    children: [
                        { name: "Reduced by 1 departing DXB" },
                        { name: "Reduced by 2 departing outstation" }
                    ]
                }
            ]
        },
        {
            name: "Ground Operations\nand Fueling (AT GATE)",
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
                    name: "Fueling (OMA 8.2.1)",
                    children: [
                        { name: "Ramp Fuel -5T" },
                        { name: "Updated OFP if TOW change of 2 tons or more" }
                    ]
                },
                {
                    name: "Refueling with passengers",
                    children: [
                        { name: "Designated Evacuation Doors: 2 main deck (ML1, ML2), 1 Upper Deck (UL1 or ML5 if unavailable)\nOMA 8.2.1.3.2" }
                    ]
                },
                {
                    name: "Fuel Uplift Check (OMA 8.2.1.4)",
                    children: [
                        { name: "Actual>Calculated: 5% up to 2 tons" },
                        { name: "Actual<Calculated: 5% up to 1 ton" }
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
                        { name: "De-icing/anti-icing worksheet (OMC 10.3.1.3)" },
                        { name: "FCTM/NOR/SUPP/ADVERSE WEATHER" },
                        { name: "FCOM/NOR/SUPP/ADVERSE WEATHER/ENGINE ICE SHEDDING ON GROUND" },
                        { name: "Snowfall Intensities as a Function of Prevailing Visibility (OMC 10.3.1.2)" },
                        { name: "Type 4 Fluid Holdover Guidelines (OMC 10.3.10.5)" },
                        { name: "FCOM/NOR/SUPP/ADVERSE WEATHER/COLD WEATHER PROCEDURES" },
                        { name: "FCOM/NOR/SUPP/ADVERSE WEATHER/AIRFRAME DEICING/ANTI-ICING PROCEDURE ON GROUND" },
                        { name: "FCOM/PERF/TAKEOFF/RUNWAY CONTAMINATION/EQUIVALENCES FOR PERFORMANCE" },
                        { name: "Altitude Corrections (OMC 10.4)" }
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
                        { name: "ANC - Confirm failure - OEB - Actions - status? - checklist, reset, deferred procedure - MEL - Failure prior to takeoff" }
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
                    name: "Initial Turns (OMA 8.3.29.2.13)",
                    children: [
                        { name: "No turns below 400 ft AGL (unless required)" },
                        { name: "Max Bank Angle below 200 ft: 15 degrees" },
                        { name: "Max Bank Angle 200-400 ft: 15 degrees (20 degrees with specific approval)" }
                    ]
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
                        { name: "Aim: Arrive at destination with FRF + alternate fuel" },
                        { name: "If landing < FRF + alternate fuel: Must achieve safe landing at 2 different aerodromes with >= FRF" }
                    ]
                },
                {
                    name: "Fuel Status Definition",
                    children: [
                        { name: "Commit to Land: Landing >= FRF (OMA 8.3.7.2.2)" },
                        { name: "Minimum Fuel: Change to clearance risks landing < FRF (OMA 8.3.7.4)" },
                        { name: "Mayday Fuel: Landing < FRF (OMA 8.3.7.5)" }
                    ]
                },
                { name: "Fuel Freezing (OMC 10.1.9): -65 degrees C or colder for > 90 minutes" }
            ]
        },
        {
            name: "Descent, Approach,\nand Landing",
            children: [
                {
                    name: "Maximum Rate of Descent (OMA 8.3.20.2.22)",
                    children: [
                        { name: "Above 5,000 ft AGL: 5,000 fpm" },
                        { name: "5,000-3,000 ft AGL: 3,000 fpm" },
                        { name: "3,000-1000 ft AGL: 2,000 fpm" },
                        { name: "Below 1,000 ft AGL: 1,000 fpm" }
                    ]
                },
                {
                    name: "Approach Stabilization Criteria (OMA 8.3.20.2.28)",
                    children: [
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
        .size([height - 200, width - 400])
        .separation((a, b) => (a.parent === b.parent ? 1 : 1.2));

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
        d.y = d.depth * 450;  // Increased from 250 for more horizontal spacing
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

    // Add text
    nodeEnter.append('text')
        .attr('dy', '.35em')
        .attr('x', d => d.children || d._children ? -13 : 13)
        .attr('text-anchor', d => d.children || d._children ? 'end' : 'start')
        .text(d => d.data.name)
        .style('fill-opacity', 1e-6)
        .style('fill', '#f1f5f9');

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
        .style('font-size', d => d.depth === 0 ? '16px' : '14px');

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
