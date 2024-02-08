# ATIVIDADE PRÁTICA
# Faça um Programa que verifique se uma letra digitada é vogal ou consoante.
letra = input('digite uma letra: ').lower()
if letra == 'a' or letra == 'e' or letra == 'i' or letra == 'o' or letra == 'u':
    #if letra in 'aeiou'
    print('Sua letra é uma vogal')
elif letra =! str():
    print('Você não digitou um valor válido!')  
else:
    print('Sua letra é uma consoante')
        
   
# Faça um programa para a leitura de duas notas parciais de um aluno. O programa deve calcular a
# média alcançada por aluno e apresentar:
# A mensagem "Aprovado", se a média alcançada for maior ou igual a sete;
# A mensagem "Reprovado", se a média for menor do que sete;
# A mensagem "Aprovado com Distinção", se a média for igual a dez.
nota1 = float(input('Digite a primeira nota'))
nota2 = float(input('Digite a segunda nota'))
media = (nota1 + nota2)/ 2
print(f'Sua média é:{media}')
if media == 10.0:    
    print ("Aprovado com Distinção")  
elif media >= 7.0 and media != 10.0:
    print ("Aprovado")
else:
    print ("Reprovado")

# Faça um Programa que leia três números e mostre o maior deles.
num1 = int(input('Digite o 1º número:'))
num2 = int(input('Digite o 2º número:'))
num3 = int(input('Digite o 3º número:'))
if num1>num2 and num1>num3:
    print(f'O maior numero é {num1}')
elif num2>num1 and num2>num3:
    print(f'O maior numero é {num2}') 
else:
    print(f'O maior numero é {num3}')      

# Faça um Programa que leia três números e mostre o maior e o menor deles.
n1 = int(input('Digite o 1º número:'))
n2 = int(input('Digite o 2º número:'))
n3 = int(input('Digite o 3º número:'))
maior= max(n1,n2,n3)
menor = min(n1,n2,n3)
# Faça um programa que pergunte o preço de três produtos e informe qual produto você deve comprar,
# sabendo que a decisão é sempre pelo mais barato.

# Faça um Programa que leia três números e mostre-os em ordem decrescente.