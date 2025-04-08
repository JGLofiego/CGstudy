[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/VnP7Ms7l)
# Lab03 - Acompanhamento de Raios (*Ray Casting*)

## Objetivos:

1. Aprofundar o conceito e uso de *shaders* no contexto do *Three.JS*;
2. Reforçar os conceitos envolvidos no processo de síntese de imagem por lançamento de raios.

## Sintese de Imagem por Acompanhamento de Raios

Nesse Lab apresentamos o procecsso de síntese de imagem baseado no Algoritmo de Acompanhamento de Raios ou *Ray Casting* [1].

É um exemplo simples, envolvendo apenas um objeto, modelado na forma implícita, mas apresenta bem o princípio do algoritmo. 

Mais tarde no curso veremos a versão recursiva (e mais famosa) desse algoritmo: *Ray Tracing* [2].

O código aqui apresentado foi inspirado no primeiro, de uma série de 3 livros, do pesquisador [Peter Shyrley](https://www.petershirley.com/) que propõe a construção de um sistema de [Ray Tracinig](https://raytracing.github.io/) em um final de semana [3]. 

Alguem se habilita? :smiley:

# Exercícios:

1. Modifique o padrão da cor de fundo para gerar um padrão de tabuleiro de xadrez, ou seja, quadrados pretos e brancos alternados. <ins>**(1,0 ponto)**</ins>

2. Codifique uma função que calcule a interseção do raio contra o plano do fundo, considerando que é um plano atrás da esfera, perpendicular ao eixo z. <ins>**(2,0 pontos)**</ins>

3. Altere a forma de definir a cor do fragmento, levando em conta que a esfera pode ter um grau de opacidade que permita ver o fundo da cena através dela. <ins>**(2,0 ponto)**</ins>

4. Acrescente ao algoritmo de *Ray Casting* a possibilidade do raio de luz refratar na superfície da esfera. Considere que a [linguagem GLSL](https://registry.khronos.org/OpenGL-Refpages/es3/) [4](utilizada para programação dos *shaders*) já possui uma função pronta para o calculo da [refração](https://registry.khronos.org/OpenGL-Refpages/gl4/html/refract.xhtml). <ins>**(2,5 pontos)**</ins>

5. Altere o objeto que estamos desenhando de uma esfera para outro [objeto implícito](https://www.cl.cam.ac.uk/teaching/1999/AGraphHCI/SMAG/node2.html#SECTION00023000000000000000), como um cone ou um cilindro, por exemplo. <ins>**(2,5 pontos)**</ins>


## Referências:

[1] APPEL, Arthur. **Some techniques for shading machine renderings of solids**. In: Proceedings of the April 30--May 2, 1968, spring joint computer conference. 1968. p. 37-45.

[2] WHITTED, Turner. **An improved illumination model for shaded display**. In: Proceedings of the 6th annual conference on Computer graphics and interactive techniques. 1979. p. 14.

[3] Shirley, Peter. **Ray tracing in one weekend**. Amazon Digital Services LLC 1 (2016). 

[4] Khronos Group, **OpenGL® and OpenGL® ES Reference Pages**, acessível em: https://registry.khronos.org/OpenGL-Refpages/es3/ 
