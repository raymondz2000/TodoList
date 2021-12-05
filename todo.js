/* better weay to do dthis tutorial is tring to connect the server and something */
 
let items=[];

function check(cb){
    if (cb.checked){
        for(let i of items){
            if (cb.id.replace("cb","")=== i.id){
                i.checked =true;             
            }
            
        }
    }
    else{
        for (let i of items){
            if(cb.id.replace("cb","")=== i.id){
                i.checked=false;
                
            }
        }

    }

}
function repeat(input){
    for(let i of items){
        if(input!=i.id){
            continue;
        }
        else{
            return true;
        }
    }
    return false;
}


function add(){
    let input = document.getElementById("input");
    let inputid = input.value;
    
    if(repeat(inputid)==true) {
        alert("This item is already in the list")
        input.value='';
    }
    else{
        if(input.value!=""&&input.value.charAt(0)!=" "){
            var request = new XMLHttpRequest();
            request.onreadystatechange=function(){
                if(this.readyState==4 && this.status==200){
                    console.log(this.status)
                    items.push({id:inputid,checked:false,height:false,highlight:false});
                    render();
                }
              
               
            }
            
            request.open("POST","/list",true);
            request.setRequestHeader("Content-Type", "application/json");
            request.send(JSON.stringify(inputid));
            
          
            input.value='';
        }
        else{
            alert("Please enter a valid things");
            input.value='';
        }
    }
}
function inititem(){
    var xhttp =  new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState==4&&this.status==200){
            var list = JSON.parse(this.responseText);
            console.log("get data from server")
            console.log(this.status)
            list.forEach(inputid => {
                
                items.push({id:inputid,checked:false,height:false,highlight:false});
            });
            render();
        }
    }
    xhttp.open("GET","/list",true)
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send();
    setInterval(function(){
        let request = new XMLHttpRequest();
        request.onreadystatechange = function(){
            if(this.readyState==4&&this.status==200){
                items=[];
                let list=JSON.parse(this.responseText);
                list.forEach(inputid=>{
                    items.push({id:inputid,checked:false,height:false,highlight:false});
                });
                render();
            }
        };
        request.open("GET","/list",true);
        request.setRequestHeader("Accept", "application/json");
        request.send();
    },5000)
}
function deleteitem (){
    let newItem=[];
    let newItem2=[];
    let checkboxes = document.getElementsByClassName("checkbox"); 

    if(checkboxes.length==0){
       alert("Nothing to Delete");
    }
    else{
      
        var request = new XMLHttpRequest();
        request.onreadystatechange=function(){
            if(request.readyState==4 && request.status==200){
                console.log(this.status)
                
            }
           
        }
        
        for(let c of checkboxes) {
                for(let i of items){
                    if(!c.checked){
                        if(c.id.replace("cb","")===i.id){
                                newItem.push(i)
                                newItem2.push(i.id)
                                break;   
                       }
                //     }else if (c.checked){
                //      if(c.id.replace("cb","")===i.id){
                //         request.open("PUT","/list",true);
                //         request.setRequestHeader("Content-Type", "application/json");
                //         request.send(i.id);
                       
                //        continue;            
                //   }
                }    
            }
         }
                        request.open("PUT","/list",true);
                        request.setRequestHeader("Content-Type", "application/json");
                        request.send(JSON.stringify(newItem2));
            items=newItem;
            render();
         
       /*  error with cant set status for every item */ 
    }
    
    }


function sort(){
    items.sort(function(a,b){
        let x=a.id.toLowerCase();
        let y=b.id.toLowerCase();
        if(x<y){return -1};
        if(x>y){return 1};
        return 0;
    })
    render();
}
function highlight(){
    for(let i of items){ 
        if(i.checked){ 
            if(i.highlight===false){
                i.highlight=true;
            }
            else if(i.highlight===true){
               i.highlight=false;
               i.checked=false;
            }
        }
    }
    render();
}
 

function render(){

   document.getElementById("sectiontoday").innerHTML="";
    for (let i of items){

        let li =  document.createElement("li")
        let item = document.createElement("div");
        item.setAttribute("i.id","item "+ i.id)
        item.setAttribute("className","item")

        let cb = document.createElement("input");
        cb.setAttribute("type", "checkbox");
        cb.className = "checkbox";
        cb.id = "cb"+i.id;
      
        cb.setAttribute("onclick", "check(this)");
        
        if(i.checked){
            cb.checked=true;
        }

        let lb = document.createElement("label");
        lb.id="label"+i.id
        lb.classname="cblabel";
        lb.setAttribute("for",cb.id)
        lb.innerHTML=i.id;

        if(i.highlight==true){
            lb.setAttribute("style","background-color:yellow")
        }
        else{
            lb.setAttribute("style","color:black")
        }
 
        item.append(cb,lb)
        li.appendChild(item);

        document.getElementById("sectiontoday").appendChild(li);
    }


  
}