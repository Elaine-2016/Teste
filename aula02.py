valor = float(input('Digite quanto você ganha por hora: \n'))
horas = float(input('Digite quantas horas você trabalhou esse mês: \n'))
salario = valor * horas
ir = (11 / 100) * salario
inss = (8 / 100) * salario
sindicato = (5 / 100) * salario
desconto = salario - (ir + inss + sindicato)
sliquido = salario - desconto
# print(f'Seu sálario bruto esse mês é: R$ {salario}.')
# print(f'Seu sálario líquido esse mês é: R$ {sliquido}.')
# print(f' Desconto do INSS: R$ {inss}.')
# print(f'Desconto do sindicato: R$ {sindicato}.')
# print(f'Desconto do IR: R$ {ir}.')
print(f'''
     Sálario bruto:R$ {salario}
     IR:IR: R$ {ir}
     INSS: R$ {inss}
     Sindicato: R$ {sindicato}
     Sálaio líquido: R$ {sliquido}
     ''')