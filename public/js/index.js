

const emailASerEnviado = {
    from: 'Pareos',
    to: 'anajulia@pareos.com.br',
    subject: 'Teste',
    text: 'Testando 123'
}

async function enviarEmail(){
    const nodemailer = await require('nodemailer');
    
    require('dotenv').config()
    const transport = await nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'gmail',
        secure: false,
        auth: {
            user: 'dataroom@pareos.com.br',
            pass: 'tqabacqmmeumdwrt'
        },
        tls:{
            rejectUnauthorized: false
        }
    })
    transport.sendMail(emailASerEnviado, (err)=> {
        if(err){
            console.log(err)
            return
        }
        console.log('E-mail enviado')
    })

}
//enviarEmail()

var link = document.querySelector('a')
var texto = 'Teste 123'
link.href = `https://api.whatsapp.com/send?phone=5584999391233&text=${texto}`