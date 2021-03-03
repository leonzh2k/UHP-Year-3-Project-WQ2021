export function Prim(nodeList, $start) {
    $(".control-panel-viz-feature").remove();
    // reset colors of all nodes and edges
    nodeList.forEach(node => {
        node.css("border", "3.5px black solid")
        node.data("neighbors").forEach(neighbor => {
            neighbor.edge.css("backgroundColor", "black")
        })
    })
    let MSTVertices = []; // nodes in the tree that will be grown
    let MSTEdges = [];
    let commandOrder = []; //command queue
    MSTVertices.push($start);
    commandOrder.push({
        command: "firstNode", //means highlight this node to show
        node: $start
    })
    while (MSTVertices.length != nodeList.length) { //ends when all vertices are put in the MST
        let neighborsOfMST = []; //get list of nodes not in MST but are connected to MST
        MSTVertices.forEach(vertex => {
            // commandOrder.push({
            //     command: "visitNode", //means highlight this node to show
            //     node: vertex
            // })
            vertex.data("neighbors").forEach(neighbor => {
                if (MSTVertices.includes(neighbor.neighbor)) {
                    // commandOrder.push({
                    //     command: "checkEdge", //means we are highlighting this edge so show we are checking it
                    //     params: "createsCycle", // if mst includes neighbor, than it creates a cycle
                    //     edge: neighbor.edge
                    // })
                    return;
                }
                neighbor.mstVertex = vertex;
                neighborsOfMST.push(neighbor)
                commandOrder.push({
                    command: "checkEdge", //means we are highlighting this edge so show we are checking it
                    params: null,
                    edge: neighbor.edge
                })
            })
        })
        console.log("neihbors of MST: ")
        neighborsOfMST.forEach(neighbor => {
            console.log(neighbor.neighbor.data("id"))
        })
        neighborsOfMST.sort((neighbor1, neighbor2) => neighbor1.weight - neighbor2.weight)
        console.log("neihbors of MST (osrted by weight): ")
        neighborsOfMST.forEach(neighbor => {
            console.log(neighbor.neighbor.data("id"))
        })
        ///newest edge of MST
        let MSTEdge = {
            vertex1: neighborsOfMST[0].mstVertex,
            vertex2: neighborsOfMST[0].neighbor
        }
        MSTVertices.push(neighborsOfMST[0].neighbor)
        // neighborsOfMST[0].edge.css("backgroundColor", "yellow")
        MSTEdges.push(MSTEdge)

        //command to add edge to MST
        commandOrder.push({
            command: "addToMST", //means we are highlighting this edge so show it is added to MST
            nodeToAdd: neighborsOfMST[0].neighbor,
            edge: neighborsOfMST[0].edge
        })
        console.log("MST: ")
        MSTEdges.forEach(edge => {
            console.log(`${edge.vertex1.data("id")} - ${edge.vertex2.data("id")}`);
        })
        
    } 
    nodeList.forEach(node => {
        node.data("inMST", false)
    })
    let delay = 1000;
    commandOrder.forEach(command => {
        if (command.command == "firstNode") {
            setTimeout(() => {
                command.node.css("border", "3.5px green solid")
                command.node.data("inMST", true)
                // nodeList.forEach(node => {
                //     if (node == command.node) {
                //         console.log("die")
                //     }
                //     if (node.data("inMST") == true) {
                //         console.log("die2")
                //     }
                // })
            }, delay)
        }
        else if (command.command == "visitNode") {
            setTimeout(() => {
                command.node.css("border", "3.5px blue solid")
            }, delay)
            nodeList.forEach(node => {
                if (node == command.node) {
                    console.log("die")
                }
                if (node.data("inMST") == true) {
                    console.log("die2")
                }
            })
            if (command.node.data("inMST") == true) {
                console.log("in mst")
                setTimeout(() => {
                    command.node.css("border", "3.5px green solid")
                }, delay + (2000 * (command.node.data("neighbors").length + 1)))
            }
            else {
                setTimeout(() => {
                    command.node.css("border", "3.5px black solid")
                }, delay + (2000 * (command.node.data("neighbors").length + 1)))
            }
            
        }
        else if (command.command == "checkEdge") {
            setTimeout(() => {
                if (command.params == "createsCycle") {
                    command.edge.css("backgroundColor", "red")
                }
                else {
                    command.edge.css("backgroundColor", "orange")
                }
            }, delay)
            setTimeout(() => {
                command.edge.css("backgroundColor", "black")
            }, delay + 2000)
        }
        else if (command.command == "addToMST") {
            setTimeout(() => {
                command.nodeToAdd.css("border", "3.5px green solid")
                command.edge.css("backgroundColor", "yellow")
                // command.edge.data("")
            }, delay)
            // setTimeout(() => {
            //     command.nodeToAdd.css("border", "3.5px black solid")
            //     command.edge.css("backgroundColor", "yellow")
            // }, delay + 2000)
        }
        delay += 2000;
    })
    

}

// nodeListCpy = nodeList.filter(node => !MSTVertices.includes(node))
        // nodeListCpy.sort((node1, node2) => node1.data("distance") - node2.data("distance"));
        
        
        
        
        
        // for (let i = 0; i < MSTVertices.length; i++) { // check every neighbor of every node in the tree.
        //     let vertex = MSTVertices[i];
        //     for (let j = 0; j < vertex.data("neighbors").length; j++) { 
        //         let neighbor = vertex.data("neighbors")[j];
        //         if (MSTVertices.includes(neighbor)) { //checks if created cycle
        //             continue;
        //         }
        //     }
        // }