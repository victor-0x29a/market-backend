## 🛒 Market API

</br>

<ul>
  <li>
      Produtos
      <ol>
        <li>
          Nome; ✅
        </li>
        <li>
          BarChar (Código de barras); ✅
        </li>
        <li>
          Estoque; ✅
        </li>
        <li>
          Estoque em avaria; ✅
        </li>
        <li>
          Se tem troca; ✅
        </li>
        <li>
          Empresa responsável; ✅
        </li>
      </ol>
  </li>
    <li>
      Empresas (Fornecedores)
      <ol>
        <li>
          Nome; ✅
        </li>
        <li>
          CNPJ; ✅
        </li>
        <li>
          Telefone; ✅
        </li>
        <li>
          Email; ✅
        </li>
      </ol>
  </li>
  <li>
      Pessoas (Operador de caixa)
      <ol>
        <li>
          Consulta de BarChar (Código de barras); ✅
        </li>
        <li>
          Efetuar finalização de compras (Dinheiro "físico", clientes cadastrados e "cartão");
        </li>
        <li>
          Iniciar com ponto;
        </li>
      </ol>
  </li>
  <li>
      Pessoas (Financeiro)
      <ol>
        <li>
          Consulta de BarChar (Código de barras); ✅
        </li>
        <li>
          Efetuar finalização de compras (Dinheiro "físico", clientes cadastrados e "cartão");
        </li>
        <li>
          Consulta de compras realizadas;
        </li>
        <li>
          Administração de estoque; ✅
        </li>
        <li>
          Modificações de produtos; ✅
        </li>
        <li>
          Inserção de fornecedores; ✅
        </li>
        <li>
          Inserção de produtos; ✅
        </li>
      </ol>
  </li>
  <li>
      Pessoas (Administração)
      <ol>
        <li>
          Todas as permissões como gerenciamento de usuários, produtos etc... ;
        </li>
      </ol>
  </li>
  <li>
      Pessoas (Clientes)
      <ol>
        <li>
          Pagamento com o nome (CPF);
        </li>
        <li>
          Dados:
          <ol>
            <li>
              Nome completo (4-48); ✅
            </li>
            <li>
              Idade (18-70); ✅
            </li>
            <li>
              Telefone; ✅
            </li>
            <li>
              CPF; ✅
            </li>
            <li>
              Endereço (4-24); ✅
            </li>
            <li>
              Complemento de endereço (4-24); ✅
            </li>
            <li>
              Sexo (masculino, feminino ou outro); ✅
            </li>
          </ol>
        </li>
      </ol>
  </li>
</ul>

</br>

<p>
  O projeto em si ainda está em fase de <strong>desenvolvimento</strong>, como é um projeto próprio (solo), acredito que terminando o back-end, vou começar o front-end e vale lembrar que ainda tem <strong>muito</strong> pela frente.
</p>

</br>

### Tecnologias utilizadas

<ul>
  <li>
    <strong>NodeJS</strong> (Express, Sequelize, JsonWebToken, zod, sucrase, bcrypt);
  </li>
  <li>
    <strong>Docker</strong>
  </li>
  <li>
    <strong>MySQL</strong>;
  </li>
  <li>
    <strong>Elastic Stack</strong>;
  </li>
</ul>

### Por quê o [Elastic Stack](https://www.elastic.co)?

Pensando na longevidade da API em situações reais, estou usando o [Elastic](https://www.elastic.co/) para além de armazenar logs, armazenar informações de fornecedores e produtos, pois o [Elastic Search](https://www.elastic.co) consegue lidar com uma grande quantidade de dados. Tive essa conclusão após ter experiências com o software ["Intersolid"](https://intersolid.com.br/), que é um E.R.P voltado para supermercados, e ver que a realidade é meio diferente de um cenário mesmo que "bem imaginado" ao tentar impor um banco de dados "comum"...

Com isso, além de logs e armazenamento, vamos falar um pouco sobre o [Kibana](https://www.elastic.co/kibana) e [Logstash](https://www.elastic.co/logstash). Com o [Kibana](https://www.elastic.co/kibana), vamos poder ter a visualização de praticamente tudo que estará ocorrendo em nossa aplicação, como por exemplo, erros de nossos "funcionários" na área de frente de caixa e vamos imaginar a seguinte situação: Temos exatamente quatro pacotes de arroz registrados no estoque (não na área de vendas). Assim, um cliente foi, comprou todos os pacotes disponíveis na área de venda e mais um do estoque e quando se dirigiu ao caixa, a "nossa funcionária" passou além dos produtos da área de vendas, mais cinco (5) produtos do estoque, sendo que só havia quatro (4) produtos no estoque. Assim, um erro foi identificado e registrado pelo [Logstash](https://www.elastic.co/logstash)!

Vale lembrar que **não é somente** para isso e podemos utilizar de diversas outras formas.
