let nome = '';
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
            }
        }
    return valor;
}

function set_cookie (name,valor)
{
    let data = new Date();//cria nova data 
    data.setTime(data.getTime() + (200 * 24 * 60 * 60 * 1000)); //200 dias no futuro
    let expira = "expires=" + data.toUTCString();//expires='formato universal'
    document.cookie = `${name}=${encodeURIComponent(valor)};${expira};path=/`;//name=value;data expirar;path=/ (obs: path=/ significa geral)
    //encodeURIComponent é pra codificar caracteres especiais
}

function bem_vindo ()
{
    if (nome === null)
    {
        while (nome===null)//enquanto nome nao existir
        {
            nome = window.prompt("Qual seu nome?");
            if (nome)
            {
                set_cookie('usuario',nome);//setar coookie
                window.alert(`Bem vindo, ${nome}`);
            }
            else
            {
                window.alert('Não pode ser vazio');
                nome = null;//so pra garantir que nao vai ser '' e etc
            }
        }
    }
    else
    {
        nome = decodeURIComponent(nome);//decodifica o cookie
        window.alert(`Bem vindo, ${nome}`);
    }
}

function criar_prod (nome_produto, url_img, preco)
{
    let produto = {
        nome_produto: nome_produto,
        url_img: url_img,
        preco: preco,
    }

    //criar elementos
    let div_produto = document.createElement('div');
    let img_produto = document.createElement('img');
    let p_nome_produto = document.createElement('p');
    let p_preco_produto = document.createElement('p');
    //criar elementos
    //definir classes
    div_produto.className = 'div_produtos';
    img_produto.className = 'img_produtos';
    p_nome_produto.className = 'nome_produtos';
    p_preco_produto.className = 'preco_produtos';
    //definir classes
    //implementar no elemento
    let nome_produto_text = document.createTextNode(nome_produto);
    let preco_produto_text = String(preco);
    preco_produto_text = document.createTextNode(`R$${preco_produto_text}`);
    img_produto.src = url_img;
    p_nome_produto.appendChild(nome_produto_text);
    p_preco_produto.appendChild(preco_produto_text);
    //implementar no elemento
    //implementar na tela
    let div_pai = document.getElementById('div_pai');
    div_produto.appendChild(p_nome_produto);
    div_produto.appendChild(img_produto);
    div_produto.appendChild(p_preco_produto);
    div_pai.appendChild(div_produto);
    //implementar na tela
    return produto;
}

function usuario_entrou ()
{
    criar_prod('Porta-joias', 'porta_joias.png', 1000)
    criar_prod('Porta-joias2', 'porta_joias.png', 2000)
    criar_prod('Porta-joias3', 'porta_joias.png', 3000)
    criar_prod('Porta-joias4', 'porta_joias.png', 4000)
    nome = get_cookie('usuario');//descobrir se usuario existe
    bem_vindo();
}
document.addEventListener('DOMContentLoaded', usuario_entrou);
