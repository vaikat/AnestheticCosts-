var CartItem = function(amountForm, isInhalable, name, id,
  unitCost, amount,
  costPerMl, constant, flow, inConcentration, time,
  flowForm, inConcentrationForm, timeForm){
    this.amountForm = amountForm;
    this.isInhalable = isInhalable;
    this.name = name;
    this.id = id;
    this.unitCost = unitCost;
    this.amount = amount;
    this.costPerMl = costPerMl;
    this.constant = constant;
    this.flow = flow;
    this.inConcentration = inConcentration;
    this.time = time;
    this.flowForm = flowForm;
    this.inConcentrationForm = inConcentrationForm;
    this.timeForm = timeForm;

    this.calculateCost = function(c){

      if(c.isInhalable){
        return ((((1000*c.flow)*(c.inConcentration/100)*c.time)/c.constant)*c.costPerMl);
      } else{
        return (c.unitCost*c.amount);
      }
    }

    this.updateAmount = function(c){
      if(c.amountForm!=null){
      newAmount = c.amountForm.val();
      c.amount = newAmount;
      }
    }

    this.updateFlow = function(c){
      if(c.flowForm!=null){
      newAmount = c.flowForm.val();
      c.flow = newAmount;
      }
    }

    this.updateInConcentration = function(c){
      if(c.inConcentrationForm!=null){
      newAmount = c.inConcentrationForm.val();
      c.inConcentration = newAmount;
      }
    }

    this.updateTime = function(c){
      if(c.timeForm!=null){
      newAmount = c.timeForm.val();
      c.time = newAmount;
      }
    }

  }
