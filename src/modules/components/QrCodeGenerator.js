export default class QrCodeGenerator{

    constructor(querySelectorString) {
        this.root = document.querySelector(querySelectorString);
        this.root.innerHTML = QrCodeGenerator.html();
        this.GenerateQr(); // call the generate Qr function
    
    }

    //set the default html doc
    static html(){ 
      
        // const img = new Image;
        // img.src = './placeholder.png';
        return `
        <div class="container">
            <div class="title">
                <h2>Qr Code Generator v1</h2>
            </div>
            <div class="mt-2 card p-1">
                <div class="row">
                    <div class="col-md-8 col-sm-6 col-xm-12">
                        <div class="card p-2 ">
                            <div class="input--label">
                                <div class="title">Paste or type text here:</div>
                            </div>
                            <div class="input--form">
                                <textarea id="textData" placeholder="Type here something" name="container"
                                class="form-control text--area" rows="15"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-6 col-xm-12">
                        <div class="card p-2 ">
                            <div class="">
                                <div class="qrCodeBox text-center mb-2">
                                    <img src="" id="qrCode">
                                </div>
                            </div>
                            
                            <div id="download-holder" class=""> </div>
                        </div> 
                    </div>
                </div>
            </div>
        </div>

        <div id="toast"> </div>

       
    `

    }


    generateSuccessTst(){
        const data = document.getElementById("textData")
        let stat = ""

        if(data.value.trim() != ""){
            return stat = "Ok"
        }
        console.log(stat);
           
            document.getElementById("toast").innerHTML = ` <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
            <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    
                <strong class="me-auto">success!</strong>
                <small>11 mins ago</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    Qr code succesfully generated!
                </div>
            </div>
        </div>`;
        
        
        var toastLiveExample = document.getElementById('liveToast')
        var toast = new bootstrap.Toast(toastLiveExample)
        toast.show()
    }


    GenerateQr(){
        const data = document.querySelector('#textData');
        const qrCode = document.querySelector('#qrCode');
       
        const baseURL = "https://api.qrserver.com/v1/create-qr-code/";
        const empty = "http://via.placeholder.com/250x250"
        qrCode.src = `${empty}`;
        data.addEventListener('keyup',()=>{
          
         
            if (data.value.trim() ==0) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Cannot Generate empty text',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                  })
                // qrCode.src = "placeholder.png"
                qrCode.src = `${empty}`;
            }else{
               
                const title = `OMPA_QR_`
                
               
                document.getElementById("download-holder").innerHTML = `<button id="downloadQr" class="form-control mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">Download</button>`;
                this.downloadQr(); // call the download Qr function
                this.generateSuccessTst();
                
                //set the image holder to the generated qr
                qrCode.src = `${baseURL}?/size=${title}&data=${data.value}`;
            }
        })

    }

    downloadQr(){
        let textField = document.querySelector('#textData')
        let btnDownload = document.getElementById('downloadQr');
        
              // Must use FileSaver.js 2.0.2 because 2.0.3 has issues.
            btnDownload.addEventListener('click', () => {
                if(textField.value == null){
                    alert("cannot download empty QR code");
                }else{
                    let img = document.querySelector('#qrCode');
                    let imagePath = img.getAttribute('src');
                    let fileName = getFileName(imagePath);
                    saveAs(imagePath, fileName);
                }
               
            });
            function getFileName(str) {
                return str.substring(str.lastIndexOf('/') + 1)
            }
        

      
    }
   

    

}