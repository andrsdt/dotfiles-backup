function getItem(h)
{
	switch (h)
	{
		case 'pepephone.com': return {key: 'cookiesChosen', value: 'done'};
	}
	
	
	const parts = h.split('.');
	
	if (parts.length > 2)
	{
		parts.shift();
		return getItem(parts.join('.'));
	}
	
	return false;
}


let	h = document.location.hostname.replace(/^w{2,3}\d*\./i, ''),
	item = getItem(h);

if (item) {
	if (sessionStorage.getItem(item.key) != item.value) {
		sessionStorage.setItem(item.key, item.value);
		document.location.reload();
	}
}