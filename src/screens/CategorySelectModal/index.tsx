import { FlatList } from "react-native";
import { Category } from "../../@types";
import Button from "../../components/Forms/Button";
import { categories } from "../../mocks/categories";
import * as S from "./styles";

type CategorySelectProps = {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
};

const CategorySelectModal = ({
  category,
  setCategory,
  closeSelectCategory,
}: CategorySelectProps) => {
  const handleSelectCategory = (categorySelected: Category) => {
    setCategory({
      key: categorySelected.key,
      name: categorySelected.name,
    });
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>Categoria</S.Title>
      </S.Header>
      <FlatList
        data={categories}
        style={{
          flex: 1,
          width: "100%",
        }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <S.Category
            onPress={() =>
              handleSelectCategory({
                key: item.key,
                name: item.name,
              })
            }
            isActive={item.key === category.key}
          >
            <S.Icon name={item.icon} />
            <S.Name>{item.name}</S.Name>
          </S.Category>
        )}
        ItemSeparatorComponent={() => <S.Separator />}
      />

      <S.Footer>
        <Button title="Selecionar" onPress={closeSelectCategory} />
      </S.Footer>
    </S.Container>
  );
};

export default CategorySelectModal;
