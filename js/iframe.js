    window.addEventListener("load",function(){
        function ifme(){
            let pre=document.querySelectorAll('.pre');
            for(let i=0;i<pre.length;i++){
                pre[i].addEventListener('click',function(){
                    window.open('../iframe.html');
                })
            }
            
        }
        ifme();
             
    })
   