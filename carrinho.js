let preco_total = 0;
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
    let div_pai = document.getElementById('div_pai');
    for (let i=0;i<length_cookies;i++)
    {
        if (compras.includes(`;${i};`)===true)
        {
            let produto = get_cookie(`prod_${i}`);
            produto = JSON.parse(produto);
            console.log(produto)
            let div_filho = document.createElement('div');
            div_filho.className = 'div_filho';
            let produto_nome = produto.nome_produto
            let produto_preco = ` - R$${produto.preco}`;
            produto_nome = document.createTextNode(produto_nome);
            produto_preco = document.createTextNode(produto_preco);
            div_filho.appendChild(produto_nome);
            div_filho.appendChild(produto_preco);
            div_filho.id = produto.id_div;
            div_pai.appendChild(div_filho);
            preco_total+=produto.preco;
        }
    }
    let preco_total_text = `R$${preco_total.toFixed(2)}`;
    preco_total_text = document.createTextNode(preco_total_text);
    let preco_fixo = document.getElementById('preco_fixo');
    preco_fixo.appendChild(preco_total_text);
    forEach_apagar();
}

document.addEventListener('DOMContentLoaded', add_prods);

function forEach_apagar()
{
    let divs_filho = document.querySelectorAll('.div_filho');
    divs_filho.forEach(div_filho => {
        div_filho.addEventListener('click', () => {
            let id_div_atual = div_filho.id;
            let aceitou = window.confirm('Tem certeza que deseja apagar?')
            if (aceitou===true)
            {
                let div_apagar = document.getElementById(id_div_atual);
                div_apagar.remove();
                let produtos_apagados = get_cookie('comprar');
                produtos_apagados = produtos_apagados.replace(`;${id_div_atual};`,';');
                console.log(produtos_apagados);
                set_cookie('comprar', produtos_apagados);
                let produto = get_cookie(`prod_${id_div_atual}`);
                produto = JSON.parse(produto);
                let produto_preco = produto.preco;

                preco_total-= produto_preco;
                let preco_fixo = document.getElementById('preco_fixo');
                let preco_total_text = `R$${preco_total.toFixed(2)}`;
                preco_total_text = document.createTextNode(preco_total_text);
                preco_fixo.textContent = '';
                preco_fixo.appendChild(preco_total_text);
            }   
        })
    });
}
