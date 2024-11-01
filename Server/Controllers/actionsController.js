const Action = require('../Models/Action');

exports.getAllActions = async (req, res) => {
  try {
    const actions = await Action.find();
    res.json(actions);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar ações.' });
  }
};

exports.addAction = async (req, res) => {
    console.log(req.body)
  const { nome, valor, crescimento } = req.body;
  try {
    const newAction = new Action({ nome, valor, crescimento });
    await newAction.save();
    res.status(201).json(newAction);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Erro ao adicionar ação.' });
  }
};