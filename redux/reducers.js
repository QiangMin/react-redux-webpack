import {combineReducers} from 'redux'
import {i18nJson} from '../components/common/i18n'

function menuStateShow(state=true,action){
	switch(action.type){
		case 'menuStateShow':
			return action.state;
		default:
			return state;

	}
}
let language = (navigator.language || navigator.browserLanguage).toLocaleLowerCase().replace('-','_');
let languageJson;
if(language=='zh_cn'){
	languageJson= {
		i18nObj:i18nJson['zh_cn'],
		language:'zh_cn'
	} ;
}else{
 	languageJson= {
		i18nObj:i18nJson['en_us'],
		language:'en_us'
	};
}

console.log(languageJson);
function changeLanguage(state=languageJson,action){
	if(action.type=="changeLanguage"){
		if(action.language=="zh_cn"){
			return {
				i18nObj:i18nJson['zh_cn'],
				language:'zh_cn'
			};
		}else{
			return {
				i18nObj:i18nJson['en_us'],
				language:'en_us'
			};
		}
	}
	return state;
}

export default combineReducers({
	menuStateShow,
	changeLanguage

})