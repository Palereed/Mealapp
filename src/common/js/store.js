export function saveToLocal (id, key, value) {
  let seller = localStorage.__seller__
  if (!seller) {
    seller = {}
    seller[id] = {}
  } else {
    seller = JSON.parse(seller)
    if(!seller[id]){
      seller[id] = {}
    }
  }
  seller[id][key] = value 
  window.localStorage.__seller__ = JSON.stringify(seller)
}

export function loadFormLocal (id, key, def) {
  let seller = window.localStorage.__seller__;
  //没有seller返回默认值
	if (!seller) {
		return def;
	}
	//字符串转化为json对象
	seller = JSON.parse(seller)[id];
	//取不到返回默认值
	if (!seller) {
		return def;
	}
	let ret = seller[key];
	return ret || def;
}
