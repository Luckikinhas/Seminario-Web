function get_cookie (nome_cookie)
{
    //devolve assim: name=value;name2=value;name3=value
    let all_cookies = document.cookie.split(';');//por isso separar 
    let valor = null;
    for (let i = 0;i<all_cookies.length;i++)
        {
            if(all_cookies[i].includes(nome_cookie)===true) 
            {
                let posicao_igual = all_cookies[i].indexOf('=');//pegar valor do =
                posicao_igual = Number(posicao_igual);//transformar em num
                valor = all_cookies[i].substring(posicao_igual+1);//pegar value;
                valor = decodeURIComponent(valor);
            }
        }
    return valor;
}

function set_cookie (name,valor)
{
    let data = new Date();//cria nova data 
    data.setTime(data.getTime() + (200 * 24 * 60 * 60 * 1000)); //200 dias no futuro
    let expira = "expires=" + data.toUTCString();//expires='formato universal'
    document.cookie = `${name}=${encodeURIComponent(valor)}; ${expira}; path=/`;//name=value;data expirar;path=/ (obs: path=/ significa geral)
    //encodeURIComponent é pra codificar caracteres especiais
}

function add_prods ()
{
    let all_cookies = document.cookie.split(';');
    let length_cookies = all_cookies.length;
    let compras = get_cookie('comprar');
    for (let i=0;i<length_cookies;i++)
    {
        if (compras.includes(`;${i};`)===true)
        {
            let produto = get_cookie(`prod_${i}`);
            produto = JSON.parse(produto);
            console.log(produto)
        }
    }
}

document.addEventListener('DOMContentLoaded', add_prods);