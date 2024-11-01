const express = require('express');
const router = express.Router();
const { getAllActions, addAction } = require('../Controllers/actionsController');
const Action = require('../Models/Action');

router.get('/', getAllActions);
router.post('/', addAction);

router.delete('/:id', async (req, res) => {
    try {
      const actionId = req.params.id;
      const deletedAction = await Action.findByIdAndDelete(actionId);
  
      if (!deletedAction) {
        return res.status(404).json({ message: 'Ação não encontrada' });
      }
  
      res.status(200).json({ message: 'Ação removida com sucesso' });
    } catch (error) {
      console.error('Erro ao remover a ação:', error);
      res.status(500).json({ message: 'Erro ao remover a ação' });
    }
});
  
router.put('/:id', async (req,res) => {
    try {
        const actionId = req.params.id;
        const updatedData = req.body;

        const updatedAction = await Action.findByIdAndUpdate(actionId, updatedData, {
            new: true,
            runValidators: true,
        });

        if(!updatedAction){
            return res.status(404).json({message: 'ação não encontrada'});
        }

        res.status(200).json({message: 'ação atualizada com sucesso', action: updatedAction})
    } catch(error){
        console.error('Erro ao atualizar a ação: ', error);
        res.status(500).json({message: 'Erro ao atualizar a ação'});
    }
});

module.exports = router;


  
  

