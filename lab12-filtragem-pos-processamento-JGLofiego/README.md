[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/6yr8g5gX)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=15516742&assignment_repo_type=AssignmentRepo)
# Lab12 - Processamento de Imagem e Pós-Processamento (Atividade Pontuada)

## Objetivos:

1. Apresentar a tẽcnica de pós-processamento dentro do *framework Three.JS*;
2. Experiementar o uso dos *shader passes* pré programados e suas aplicações;
3. Construir/customizar *shader passes* para aplicar as transformações de intensidade e filtragem espaciais. 

# Atividades:

1. Leia com atenção as referencias [3] e [4] que descrevem o conceito de pós-processamento no *Three.JS* [3]. Observe os exemplos relacionados ao tema "pos-processing". Consulte o professor em caso de dúvida.

2. Analise os códigos fornecidos nesse Lab, referentes as transformações de intensidade e filtros espaciais já implementados como um *shader-pass* pré-programado.

3. Crie novos itens, baseados nos fornecidos nesse Lab, que possuam *shader-pass* customizados para:

    1. Criar uma versão negativa da imagem colorida (**1,0 ponto**);

    Considere para os próximos itens que as transformações serão sempre aplicadas a imagem convertida para tons de cinza:

    2. Controlar a luminosidade da imagem, ou seja, possa clarea-la ou escurece-la (**1,0 ponto**);
    3. Modificar o filtro Sobel para que possa mostrar apenas a intensidade de uma das componentes do vetor gradiente da imagem separadamente (**1,0 ponto**). 
    4. Calcular e apresentar o Laplaciano da imagem (**1,5 pontos**).
    5. Gerar a máscara de nitidez e aplica-la a image (**1,5 pontos**).

4. Teste aplicar as transformações do item 3.2 a 3.5 em cada canal de cor separadamente. Acrescente um componente na GUI que permita escolher qual resultado visualizar  (**2,0 pontos**).
5. Avalie como voce poderia implementar essas transformações mantendo as cores da imagem original. Teste sua solução incorporando mais essa opção na GUI dos itens 3.2 à 3.5, de forma que seja possível comparar os resultados dos itens 3, 4 e agora o 5 (**2,0 pontos**). 

> Fique atento que certas operações quando aplicadas aos pixels podem gerar valores negativos, que devem ser tratados de forma adequada para a visualização dos resultados. 

## Referências:

[1] MARSCHNER, Steve; SHIRLEY, Peter. "**Fundamentals of Computer Graphics**". 5th Edition CRC Press, 2021.

[2] Dirksen, J., **Learn Three.JS: Program 3D animations and visualizations for the web with JavaScript and WebGL**. 4th Edition, Packt Publishing, 2023.

[3]  **How to use post-processing**, https://threejs.org/docs/#manual/en/introduction/How-to-use-post-processing 

[4] **Post Processing**, https://threejs.org/manual/#en/post-processing
