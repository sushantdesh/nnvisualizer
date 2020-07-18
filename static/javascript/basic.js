function add_layers() {
    var nodes = document.getElementById("nodes")


    var myspan=document.createElement("span")
    var layername=document.createElement("Label")
    layername.innerHTML="Hidden Layer "+(parseInt(nodes.childElementCount)+1).toString()+ ", neurons :"
    var layernodes=document.createElement("Label")
    layernodes.innerText="2"
    var addnode = document.createElement("i")
    addnode.setAttribute("class","material-icons")
    addnode.innerText="add_circle"
    addnode.addEventListener("click",function () {
        layernodes.innerText=(parseInt(layernodes.innerText)+1).toString()
    })
    var removenode = document.createElement("i");
    removenode.setAttribute("class","material-icons")
    removenode.innerText="remove_circle"
    removenode.addEventListener("click",function () {
        if (parseInt(layernodes.innerText)>1){
        layernodes.innerText=(parseInt(layernodes.innerText)-1).toString()
        }
    })
    var mybr = document.createElement('br');

    myspan.appendChild(layername)
    myspan.appendChild(layernodes)
    myspan.appendChild(addnode)
    myspan.appendChild(removenode)
    myspan.appendChild(mybr)
    nodes.appendChild(myspan)
    document.getElementById("layers").innerText=nodes.childElementCount+ " Layers"




}
function remove_layers() {
    var nodes=document.getElementById("nodes")
    if (nodes.childNodes.length>0){
        nodes.removeChild(nodes.lastChild)
        console.log(nodes.childNodes)
    }
    document.getElementById("layers").innerText=nodes.childElementCount+ " Layers"

}