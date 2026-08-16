-- Demonstration lots only. No prices, companies, transactions, or production metrics.
insert into public.lots (lot_number, animal_type, breed, region, quantity, weight_kg, feed_type, contract_type, status, is_demo)
values
  ('DEMO-001', 'cattle', 'Швицкая', 'Чуйская область', 24, 10800, 'Зерновой откорм', 'spot', 'available', true),
  ('DEMO-002', 'sheep', 'Кыргызская тонкорунная', 'Нарынская область', 150, 6750, 'Пастбищный', 'spot', 'reserved', true),
  ('DEMO-003', 'horse', 'Ново-кыргызская', 'Иссык-Кульская область', 18, 7200, 'Пастбищный', 'forward', 'available', true),
  ('DEMO-004', 'yak', 'Кыргызский як', 'Ошская область', 30, 9000, 'Высокогорный выпас', 'forward', 'closed', true),
  ('DEMO-005', 'cattle', 'Ала-Тоо', 'Таласская область', 40, 17600, 'Комбинированный', 'forward', 'sold', true),
  ('DEMO-006', 'sheep', 'Гиссарская', 'Джалал-Абадская область', 90, 4950, 'Пастбищный', 'spot', 'available', true)
on conflict (lot_number) do update set
  animal_type = excluded.animal_type, breed = excluded.breed, region = excluded.region,
  quantity = excluded.quantity, weight_kg = excluded.weight_kg, feed_type = excluded.feed_type,
  contract_type = excluded.contract_type, status = excluded.status, is_demo = true;
