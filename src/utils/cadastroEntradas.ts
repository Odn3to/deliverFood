const secoes = [
    {
      id: 1,
      titulo: 'Insira alguns dados básicos:',
      entradaTexto: [
        {
          id: 1,
          label: 'Email',
          placeholder: 'Digite seu email',
          name: 'email',
          number: false,
          required: false
        },
        {
          id: 2,
          label: 'Crie uma senha',
          placeholder: 'Insira sua senha',
          secureTextEntry: true,
          name: 'password',
          number: false,
          required: false
        },
        {
          id: 3,
          label: 'Confirme sua senha',
          placeholder: 'Confirme sua senha',
          secureTextEntry: true,
          name: 'confirmeSenha',
          number: false,
          required: false
        }
      ],
      checkbox: [
        {
          id: 1,
          value: 'Cliente',
        },
        {
          id: 2,
          value: 'Comerciante',
        }
      ]
    },
    {
      id: 2,
      titulo: 'Dados sobre o Comércio: ',
      entradaTexto: [
        {
          id: 1,
          label: 'CEP',
          placeholder: 'Digite seu CEP do empreendimento',
          name: 'cep',
          number: true,
          required: false
        },
        {
          id: 2,
          label: 'Rua',
          placeholder: 'Nome da Rua do empreendimento',
          name: 'rua',
          number: false,
          required: false
        },
        {
          id: 3,
          label: 'Número',
          placeholder: 'Digite seu Número do empreendimento',
          name: 'numero',
          number: true,
          required: false
        },
        {
          id: 4,
          label: 'Complemento',
          placeholder: 'Digite seu Complemento',
          name: 'complemento',
          number: false,
          required: false
        },
        {
          id: 5,
          label: 'Estado',
          placeholder: 'Digite seu Estado',
          name: 'estado',
          number: false,
          required: false
        },
        {
          id: 6,
          label: 'Telefone',
          placeholder: '(00) 00000-0000',
          name: 'telefone',
          number: true,
          required: false
        },
        {
          id: 7,
          label: 'CNPJ',
          placeholder: 'CNPJ',
          name: 'cnpj',
          number: true,
          required: true
        },
        {
          id: 8,
          label: 'Número da conta',
          placeholder: 'Número da conta',
          name: 'conta',
          number: true,
          required: true
        },
        {
          id: 9,
          label: 'Número do banco',
          placeholder: 'Número da banco',
          name: 'banco',
          number: true,
          required: true
        }
        ,
        {
          id: 10,
          label: 'Número do Agência',
          placeholder: 'Número da Agência',
          name: 'agencia',
          number: true,
          required: true
        }
      ],
      checkbox: []
    }
  ]

export {secoes}