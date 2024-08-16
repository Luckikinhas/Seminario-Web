let nome = '';
let ids_divs = 0;
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
        window.alert(`Bem vindo, ${nome}`);
    }
}

function criar_prod (nome_produto, url_img, preco)
{
    let produto = {
        nome_produto: nome_produto,
        url_img: url_img,
        preco: preco,
        id_div: ids_divs,
    }

    //criar elementos
    let div_produto = document.createElement('div');
    let img_produto = document.createElement('img');
    let p_nome_produto = document.createElement('h3');
    let p_preco_produto = document.createElement('p');
    //criar elementos
    //definir classes
    div_produto.className = 'div_produtos';
    div_produto.id = ids_divs;
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
    set_cookie(`prod_${ids_divs}`, JSON.stringify(produto));//tem que transformar em JSON pra aceitar
    ids_divs++;
    //implementar na tela
    return produto;
}

function usuario_entrou ()
{
    criar_prod('Porta-joias', 'porta_joias.png', 370)
    criar_prod('Cadeira', 'cadeira.png', 250)
    criar_prod('Panela Elétrica Mondial', 'panela.png', 170)
    criar_prod('Fritadeira Air Fryer Mondial', 'air.png', 600)
    criar_prod('Fogão Elétrico Agratto', 'fogao.png', 165)
    criar_prod('Mouse Gamer Óptico', 'mouse.png', 140)
    criar_prod('Controle DualShock 1 PS2', 'controle.png', 25)
    criar_prod('Monitor 20 Polegadas Samsung', 'monitor.png', 1775)
    criar_prod('Geladeira Consul 386 Litros', 'geladeira.png', 2990)
    nome = get_cookie('usuario');//descobrir se usuario existe
    bem_vindo();
    let botao_aparecer = document.getElementById('botao_fixo')
    botao_carrinho.style.display = 'block';
    forEach_produtos();
}
document.addEventListener('DOMContentLoaded', usuario_entrou);

function forEach_produtos()
{
    let divs_filho = document.querySelectorAll('.div_produtos')
    divs_filho.forEach(div_filho => {
        div_filho.addEventListener('click', () => {
            let id_div_atual = div_filho.id;
            for (let i = 0;i<ids_divs;i++)//ids_divs ta funcinando como auxiliar tbm
            {
                let achar_prod = get_cookie(`prod_${i}`)//procura todos os produtos
                achar_prod = JSON.parse(achar_prod)
                if (achar_prod.id_div==id_div_atual)//se tiver o valor de id na string 
                {
                    let itens_comprar = get_cookie('comprar')
                    if (itens_comprar===null)
                    {
                        set_cookie('comprar', `;${id_div_atual};`)//vetor de todas as compras
                        window.alert('Produto adicionado ao carrinho');
                    }
                    else if (itens_comprar.includes(id_div_atual)===false)
                    {
                        itens_comprar += id_div_atual;
                        set_cookie('comprar', `${itens_comprar};`);
                        window.alert('Produto adicionado ao carrinho');
                    }
                    else
                    {
                        window.alert('Produto já está no carrinho');
                        break;
                    }
                }
            }
        })
    });
}


function trocar_pag()
{
    window.location.href = 'carrinho.html'
}
let botao_carrinho = document.getElementById('botao_fixo');
botao_carrinho.addEventListener('click', trocar_pag);
